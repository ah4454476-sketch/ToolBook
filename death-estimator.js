
(function init(){
  const monthEl = document.getElementById('month');
  const dayEl = document.getElementById('day');
  const yearEl = document.getElementById('year');
  const countryEl = document.getElementById('country');

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  months.forEach((m,i)=>{ const o=document.createElement('option'); o.value=i+1; o.textContent=m; monthEl.appendChild(o); });

  const now = new Date();
  const currentYear = now.getFullYear();
  for(let y=currentYear; y>=1900; y--){ const o=document.createElement('option'); o.value=y; o.textContent=y; yearEl.appendChild(o); }

  function updateDays(){
    const month = parseInt(monthEl.value) || 1;
    const year = parseInt(yearEl.value) || 2000;
    const days = new Date(year, month, 0).getDate();
    dayEl.innerHTML = '';
    for(let d=1; d<=days; d++){ const o=document.createElement('option'); o.value=d; o.textContent=d; dayEl.appendChild(o); }
  }
  monthEl.addEventListener('change', updateDays);
  yearEl.addEventListener('change', updateDays);
  monthEl.value = 1; yearEl.value = 2000; updateDays();

  const englishSpeaking = ['United States','United Kingdom','Canada','Australia','Ireland','New Zealand'];
  const others = ['Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Austria','Bangladesh','Belgium','Brazil','China','Denmark','Egypt','France','Germany','India','Indonesia','Italy','Japan','Kenya','Mexico','Netherlands','Nigeria','Pakistan','Philippines','Russia','Saudi Arabia','South Africa','Spain','Sri Lanka','Sweden','Switzerland','Thailand','Turkey','United Arab Emirates','Vietnam','Zimbabwe'];
  const countries = [...englishSpeaking, ...others.sort((a,b)=>a.localeCompare(b))];
  countries.forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c; countryEl.appendChild(o); });
})();

document.getElementById('estimateBtn').addEventListener('click', function(){
  const month = parseInt(document.getElementById('month').value);
  const day = parseInt(document.getElementById('day').value);
  const year = parseInt(document.getElementById('year').value);
  const gender = document.getElementById('gender').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const smoke = document.getElementById('smoke').value;
  const alcohol = document.getElementById('alcohol').value;
  const country = document.getElementById('country').value;
  const resultEl = document.getElementById('result');

  if(!month || !day || !year || !weight || !height){
    resultEl.innerHTML = '<span style="color:#b51000">Please fill all fields correctly.</span>';
    return;
  }

  let expectancy = 75;
  if(gender === 'female') expectancy += 5;
  if(smoke === 'yes') expectancy -= 10;
  if(alcohol === 'yes') expectancy -= 5;

  const bmi = weight / ((height/100)*(height/100));
  if(bmi < 18.5) expectancy -= 2; else if(bmi > 30) expectancy -= 5;

  if(['Japan'].includes(country)) expectancy += 3;
  if(['United States','United Kingdom','Canada','Australia','Ireland','New Zealand'].includes(country)) expectancy += 2;
  if(['India','Pakistan','Nigeria','Bangladesh'].includes(country)) expectancy -= 3;

  const estimatedAge = Math.round(expectancy);
  const deathYear = year + estimatedAge;
  const deathDate = new Date(deathYear, month-1, day);

  const today = new Date();
  let currentAge = today.getFullYear() - year;
  if(today.getMonth() < (month-1) || (today.getMonth() === (month-1) && today.getDate() < day)) currentAge--;

  resultEl.innerHTML = '<div><b>Estimated Death Date:</b> ' + deathDate.toDateString() + '</div>' +
                       '<div><b>Expected Lifespan:</b> ' + estimatedAge + ' years</div>' +
                       '<div><b>Your Current Age:</b> ' + currentAge + ' years</div>';
});
