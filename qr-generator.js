
function generateQR() {
  var text = document.getElementById("qrText").value.trim();
  var qrContainer = document.getElementById("qrResult");
  var saveButton = document.getElementById("saveBtn");

  if (!text) {
    qrContainer.innerHTML = "<p style='color:#b51200;'>Please enter some text or URL!</p>";
    saveButton.style.display = "none";
    return;
  }

  var qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" + encodeURIComponent(text);
  qrContainer.innerHTML = "<img id='qrImage' src='" + qrUrl + "' alt='QR Code'>";
  saveButton.style.display = "inline-block";
}

function saveQR() {
  var img = document.getElementById("qrImage");
  if (!img) return;

  // Create a canvas and draw the QR image on it
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var qrImg = new Image();
  qrImg.crossOrigin = "anonymous"; // Prevent CORS issue

  qrImg.onload = function() {
    canvas.width = qrImg.width;
    canvas.height = qrImg.height;
    ctx.drawImage(qrImg, 0, 0);

    // Convert to Blob and force download
    canvas.toBlob(function(blob) {
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      alert("✅ QR Code saved to your computer (check Downloads folder).");
    });
  };

  qrImg.src = img.src;
}
