const inputs = [...document.querySelectorAll('input[type="range"]')];
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
function update() {
  const cups = Number(document.querySelector('#cups').value);
  const price = Number(document.querySelector('#price').value);
  const days = Number(document.querySelector('#days').value);
  const weekly = cups * price * days;
  const yearly = weekly * 52;
  const homeBrewSavings = Math.max(0, yearly - (cups * days * 52));
  document.querySelector('#cupsValue').textContent = cups;
  document.querySelector('#priceValue').textContent = `$${price.toFixed(2)}`;
  document.querySelector('#daysValue').textContent = days;
  document.querySelector('#annualTotal').innerHTML = `${money(yearly)}<span>/year</span>`;
  document.querySelector('#monthlyTotal').textContent = `${money(yearly / 12)} / month`;
  document.querySelector('#weeklyTotal').textContent = money(weekly);
  document.querySelector('#savings').textContent = money(homeBrewSavings);
  inputs.forEach(input => {
    const progress = ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100;
    input.style.setProperty('--fill', `${progress}%`);
  });
}
inputs.forEach(input => input.addEventListener('input', update));
document.querySelector('#year').textContent = new Date().getFullYear();
update();
