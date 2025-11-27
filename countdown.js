(function(){
  const dateElement = document.getElementById("countDate");
  const dateText = dateElement.dataset.date; // e.g. "October 6"
  const msg = document.querySelector(".msg");
  const greeting = document.querySelector(".greeting");
  const timer = document.querySelector(".cDown");

  function updateCountdown(){
    const now = new Date();
    const currentYear = now.getFullYear();
    let target = new Date(`${dateText}, ${currentYear} 00:00:00`);
    let endOfEvent = new Date(`${dateText}, ${currentYear} 23:59:59`);

    // If event already passed, move to next year
    if (now > endOfEvent) {
      target = new Date(`${dateText}, ${currentYear + 1} 00:00:00`);
      endOfEvent = new Date(`${dateText}, ${currentYear + 1} 23:59:59`);
    }

    // ✅ Show greeting for the entire 24 hours of the event date
    if (now >= target && now <= endOfEvent) {
      timer.style.display = "none";
      msg.style.display = "none";
      greeting.style.display = "block";
      return;
    }

    // Otherwise, show countdown
    greeting.style.display = "none";
    msg.style.display = "block";
    timer.style.display = "flex";

    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.querySelector(".days").innerText = days;
    document.querySelector(".hours").innerText = hours;
    document.querySelector(".minutes").innerText = minutes;
    document.querySelector(".seconds").innerText = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
