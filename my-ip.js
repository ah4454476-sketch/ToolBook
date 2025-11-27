  function getIPAddress() {
    fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('ip-address').innerText = data.ip;
      })
      .catch(error => {
        console.error(error);
        document.getElementById('ip-address').innerText = 'Failed to fetch IP address.';
      });
  }
  document.addEventListener('DOMContentLoaded', getIPAddress);
