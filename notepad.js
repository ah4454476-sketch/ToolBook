const editor = document.getElementById("editor");
const wordCountDisplay = document.getElementById("wordCount");
const postEditor = document.getElementById("postEditor");

/* --- Save as .txt --- */
function saveFile() {
  let text = editor.value.replace(/\n/g, '\r\n');
  let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  let fileName = prompt("Enter file name:", "untitled.txt");
  if (fileName) {
    if (!fileName.endsWith(".txt")) fileName += ".txt";
    let a = document.createElement("a");
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

/* --- Open File --- */
document.getElementById('fileInput').addEventListener('change', function() {
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    editor.value = e.target.result;
    updateWordCount();
  };
  reader.readAsText(file);
});

/* --- Clear Editor --- */
function clearEditor() {
  if (confirm("Clear all text?")) {
    editor.value = "";
    updateWordCount();
  }
}

/* --- Copy Text --- */
function copyText() {
  editor.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
}

/* --- Paste Text --- */
async function pasteText() {
  try {
    const text = await navigator.clipboard.readText();
    editor.value += text;
    updateWordCount();
  } catch (err) {
    alert("Paste not allowed in this browser.");
  }
}

/* --- Dark Mode Toggle --- */
function toggleDarkMode() {
  postEditor.classList.toggle("dark-mode");
}

/* --- Word Count --- */
function updateWordCount() {
  const text = editor.value.trim();
  const words = text.length ? text.split(/\s+/).length : 0;
  const chars = text.length;
  wordCountDisplay.textContent = `Words: ${words} | Characters: ${chars}`;
}
editor.addEventListener("input", updateWordCount);
