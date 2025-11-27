
function convertImage() {
  const fileInput = document.getElementById("uploadImage");
  const format = document.getElementById("formatSelect").value;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (fileInput.files.length === 0) {
    alert("Please select an image first!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        const dataURL = canvas.toDataURL(format);
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "converted-image." + format.split("/")[1];
        link.click();
      } catch (e) {
        alert("⚠️ This format is not fully supported in your browser.");
      }
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}
