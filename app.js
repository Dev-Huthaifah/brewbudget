const inputs = [...document.querySelectorAll('input[type="range"]')];
const currencyInput = document.querySelector('#currency');
const query = new URLSearchParams(window.location.search);
inputs.forEach(input => {
  const requestedValue = Number(query.get(input.id));
  if (query.has(input.id) && Number.isFinite(requestedValue)) {
    const min = Number(input.min);
    const max = Number(input.max);
    const step = Number(input.step) || 1;
    const clampedValue = Math.min(max, Math.max(min, requestedValue));
    const stepValue = Math.round((clampedValue - min) / step) * step + min;
    input.value = String(Number(stepValue.toFixed(4)));
  }
});
const requestedCurrency = query.get('currency');
if ([...currencyInput.options].some(option => option.value === requestedCurrency)) {
  currencyInput.value = requestedCurrency;
}
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
document.querySelector('#shareEstimate').addEventListener('click', async () => {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = 'calculator';
  inputs.forEach(input => url.searchParams.set(input.id, input.value));
  url.searchParams.set('currency', currencyInput.value);
  const status = document.querySelector('#shareStatus');
  const shareData = {
    title: 'My BrewBudget coffee estimate',
    text: `My café coffee costs about ${document.querySelector('#annualTotal').textContent} See your estimate:`,
    url: url.toString()
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      status.textContent = 'Estimate shared.';
    } else {
      await navigator.clipboard.writeText(url.toString());
      status.textContent = 'Your estimate link is copied.';
    }
  } catch (error) {
    status.textContent = error.name === 'AbortError' ? '' : 'Could not share the link. Please try again.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
update();
