const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const resultDiv = document.getElementById('result');

const apiUrl = 'https://api.exchangerate.host/latest';

async function populateCurrencyOptions() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const currencies = Object.keys(data.rates);
  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = currency;
    option1.text = option2.text = currency;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });
  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = parseFloat(amount.value);

  if (isNaN(amountValue) || amountValue <= 0) {
    resultDiv.textContent = 'Please enter a valid amount.';
    return;
  }

  const res = await fetch(`${apiUrl}?base=${from}&symbols=${to}`);
  const data = await res.json();
  const rate = data.rates[to];
  const converted = (rate * amountValue).toFixed(2);
  resultDiv.textContent = `${amountValue} ${from} = ${converted} ${to}`;
}

populateCurrencyOptions();
