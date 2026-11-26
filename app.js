const inputs = [...document.querySelectorAll('input[type="range"]')];
const currencyInput = document.querySelector('#currency');
const currencyAmount = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyInput.value, maximumFractionDigits: 0 }).format(value);
const cupAmount = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyInput.value, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
function update() {
  const cups = Number(document.querySelector('#cups').value);
  const price = Number(document.querySelector('#price').value);
  const days = Number(document.querySelector('#days').value);
  const homePrice = Number(document.querySelector('#homePrice').value);
  const weekly = cups * price * days;
  const yearly = weekly * 52;
  const homeYearly = cups * homePrice * days * 52;
  const difference = yearly - homeYearly;
  document.querySelector('#cupsValue').textContent = cups;
  document.querySelector('#priceValue').textContent = cupAmount(price);
  document.querySelector('#daysValue').textContent = days;
  document.querySelector('#homePriceValue').textContent = cupAmount(homePrice);
  document.querySelector('#annualTotal').innerHTML = `${currencyAmount(yearly)}<span>/year</span>`;
  document.querySelector('#monthlyTotal').textContent = `${currencyAmount(yearly / 12)} / month`;
  document.querySelector('#weeklyTotal').textContent = currencyAmount(weekly);
  document.querySelector('#homePriceCopy').textContent = cupAmount(homePrice);
  document.querySelector('#homeComparisonText').innerHTML = difference > 0
    ? `you could save <b id="savings">${currencyAmount(difference)}</b> per year.`
    : difference < 0
      ? `brewing at home would cost <b id="savings">${currencyAmount(-difference)}</b> more per year.`
      : 'your estimated costs are about the same.';
  inputs.forEach(input => {
    const progress = ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100;
    input.style.setProperty('--fill', `${progress}%`);
  });
}
inputs.forEach(input => input.addEventListener('input', update));
currencyInput.addEventListener('change', update);
document.querySelector('#year').textContent = new Date().getFullYear();
update();
