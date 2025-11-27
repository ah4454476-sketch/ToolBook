
/* === Styles (Toolbar inside post) === */
const style = document.createElement('style');
style.innerHTML = `
#recorderContainer {
    max-width: 100%;
    margin: 20px auto;
    text-align: center;       /* center inside post */
}
#recorderToolbar {
    background: rgba(0,0,0,0.85);
    padding: 12px 16px;
    border-radius: 8px;
    display: inline-flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}
#recorderToolbar button {
    background: #06b6d4;
    color: #fff;
    border: none;
    padding: 8px 12px;
    font-size: 15px;
    cursor: pointer;
    border-radius: 6px;
    white-space: nowrap;
    transition: 0.3s;
}
#recorderToolbar button:hover {
    background: #04869c;
}
#recorderToolbar button:disabled {
    background: #777;
    cursor: not-allowed;
}

/* Responsive buttons for smaller screens */
@media (max-width: 600px) {
    #recorderToolbar {
        padding: 10px;
        gap: 6px;
    }
    #recorderToolbar button {
        font-size: 13px;
        padding: 6px 8px;
    }
}
`;
document.head.appendChild(style);

/* === Recorder Logic === */
let mediaRecorder;
let recordedChunks = [];
let micEnabled = true;
let systemAudioEnabled = false;
let screenStream;
let micStream;

const startBtn     = document.getElementById('startBtn');
const pauseBtn     = document.getElementById('pauseBtn');
const resumeBtn    = document.getElementById('resumeBtn');
const stopBtn      = document.getElementById('stopBtn');
const micToggle    = document.getElementById('micToggle');
const systemToggle = document.getElementById('systemToggle');

micToggle.addEventListener('click', () => {
    micEnabled = !micEnabled;
    micToggle.textContent = micEnabled ? 'Mic: ON' : 'Mic: OFF';
});

systemToggle.addEventListener('click', () => {
    systemAudioEnabled = !systemAudioEnabled;
    systemToggle.textContent = systemAudioEnabled ? 'Device Audio: ON' : 'Device Audio: OFF';
});

startBtn.addEventListener('click', async () => {
    try {
        screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: 30 },
            audio: systemAudioEnabled
        });

        if (micEnabled) {
            try {
                micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            } catch {
                alert('Microphone access denied.');
                micStream = null;
            }
        }

        const tracks = [...screenStream.getVideoTracks()];
        if (systemAudioEnabled && screenStream.getAudioTracks().length) {
            tracks.push(...screenStream.getAudioTracks());
        }
        if (micStream && micStream.getAudioTracks().length) {
            tracks.push(...micStream.getAudioTracks());
        }

        const combinedStream = new MediaStream(tracks);
        mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm; codecs=vp9' });

        mediaRecorder.ondataavailable = e => {
            if (e.data.size > 0) recordedChunks.push(e.data);
        };

        mediaRecorder.onstop = saveRecording;
        mediaRecorder.start();

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        stopBtn.disabled = false;
    } catch (err) {
        alert('Screen recording failed: ' + err);
    }
});

pauseBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        pauseBtn.disabled = true;
        resumeBtn.disabled = false;
    }
});

resumeBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        resumeBtn.disabled = true;
        pauseBtn.disabled = false;
    }
});

stopBtn.addEventListener('click', () => {
    if (mediaRecorder) mediaRecorder.stop();
    if (screenStream) screenStream.getTracks().forEach(track => track.stop());
    if (micStream) micStream.getTracks().forEach(track => track.stop());
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    stopBtn.disabled = true;
});

function saveRecording() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screen-recording.webm';
    a.click();
    recordedChunks = [];
}
