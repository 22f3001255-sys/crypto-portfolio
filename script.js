fetch('./portfolio.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('crypto-list');
    // Expect data to be an array of crypto objects with name, symbol, price
    // Display at least 4 cryptocurrencies
    for(let i = 0; i < Math.min(4, data.length); i++) {
      const crypto = data[i];
      const li = document.createElement('li');
      const nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.textContent = crypto.name;

      const symbolSpan = document.createElement('span');
      symbolSpan.className = 'symbol';
      symbolSpan.textContent = crypto.symbol.toUpperCase();

      const priceSpan = document.createElement('span');
      priceSpan.className = 'price';
      priceSpan.textContent = `$${parseFloat(crypto.price).toFixed(2)}`;

      li.appendChild(nameSpan);
      li.appendChild(symbolSpan);
      li.appendChild(priceSpan);

      list.appendChild(li);
    }
  })
  .catch(err => {
    document.getElementById('crypto-list').textContent = 'Failed to load portfolio data.';
    console.error(err);
  });