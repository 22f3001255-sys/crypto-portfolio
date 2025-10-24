fetch('./portfolio.json')
  .then((response) => {
    if (!response.ok) throw new Error('Failed to load portfolio.json');
    return response.json();
  })
  .then((data) => {
    const list = document.getElementById('crypto-list');
    // Clear existing content
    list.innerHTML = '';

    // Display at least 4 cryptocurrencies
    const cryptos = data.slice(0, 4);

    cryptos.forEach(({ name, symbol, price }) => {
      const li = document.createElement('li');
      li.textContent = name;

      const symbolSpan = document.createElement('span');
      symbolSpan.className = 'symbol';
      symbolSpan.textContent = `(${symbol})`;
      li.appendChild(symbolSpan);

      const priceSpan = document.createElement('span');
      priceSpan.className = 'price';
      priceSpan.textContent = `$${Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      li.appendChild(priceSpan);

      list.appendChild(li);
    });
  })
  .catch((err) => {
    console.error('Error loading portfolio.json:', err);
    const list = document.getElementById('crypto-list');
    list.textContent = 'Failed to load data.';
  });