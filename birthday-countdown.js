
  const monthSelect = document.getElementById("month");
  const daySelect = document.getElementById("day");
  const countdown = document.getElementById("countdown");
  const cake = document.getElementById("cake");

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Populate months
  monthNames.forEach((m, i) => {
    let opt = document.createElement("option");
    opt.value = i;
    opt.textContent = m;
    monthSelect.appendChild(opt);
  });

  // Update days for selected month
  function updateDays() {
    const year = new Date().getFullYear();
    const month = parseInt(monthSelect.value);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    daySelect.innerHTML = "";
    for (let d = 1; d <= daysInMonth; d++) {
      let opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      daySelect.appendChild(opt);
    }
  }

  monthSelect.addEventListener("change", updateDays);

  // Default month/day today
  monthSelect.value = new Date().getMonth();
  updateDays();
  daySelect.value = new Date().getDate();

  // Countdown function
  function startCountdown() {
    const now = new Date();
    const year = now.getFullYear();
    const month = parseInt(monthSelect.value);
    const day = parseInt(daySelect.value);

    let birthday = new Date(year, month, day);

    // 🎂 If today is birthday (ignore time)
    if (now.getMonth() === month && now.getDate() === day) {
      countdown.innerHTML = `<div style="width:100%">🎉 Happy Birthday! 🎉</div>`;
      cake.classList.remove("hidden");
      return;
    }

    // If birthday has passed this year, move to next year
    if (birthday < now) birthday.setFullYear(year + 1);

    const diff = birthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdown.innerHTML = `
      <div class="time-box"><span class="number">${days}</span><span class="label">Days</span></div>
      <div class="time-box"><span class="number">${hours}</span><span class="label">Hours</span></div>
      <div class="time-box"><span class="number">${minutes}</span><span class="label">Minutes</span></div>
      <div class="time-box"><span class="number">${seconds}</span><span class="label">Seconds</span></div>
    `;

    cake.classList.add("hidden");
  }

  setInterval(startCountdown, 1000);
  startCountdown();
