
  window.onload = function() {
    document.getElementById("button").addEventListener("click", createLink);
    document.getElementById("output").addEventListener("click", copyLink);
  };

  function setStatus(msg, isError = false) {
    const helpText = document.getElementById("help-text");
    helpText.innerText = msg;
    helpText.style.color = isError ? "darkred" : "#227300";
  }

  function createLink() {
    const inputVal = document.getElementById("input").value;
    const match = /\/d\/(.+?)(?:\/|#|\?|$)/.exec(inputVal);
    const outputBox = document.getElementById("output");

    if (!match) {
      outputBox.value = "";
      outputBox.disabled = true;
      setStatus("Error: Invalid URL", true);
      return;
    }

    outputBox.value = `https://drive.google.com/uc?export=download&id=${match[1]}`;
    outputBox.disabled = false;
    setStatus("Success! Click the output link to copy it.");
  }

  function copyLink() {
    if (this.disabled) return;

    this.select();
    const copied = document.execCommand("copy");
    if (copied) {
      setStatus("Link copied to clipboard!");
    } else {
      setStatus("Couldn't copy link. Copy manually.", true);
    }
  }
