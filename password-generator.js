function generatePassword() {
  const length = 15;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; ++i) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  document.getElementById("password").value = password;
}

function copyToClipboard() {
  const passwordInput = document.getElementById("password");
  passwordInput.select();
  passwordInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Password copied to clipboard: " + passwordInput.value);
}
