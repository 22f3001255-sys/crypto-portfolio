document.addEventListener('DOMContentLoaded', function () {
  fetch('./portfolio.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const list = document.getElementById('crypto-list');
      list.innerHTML = ''; // clear loading message
      if (!Array.isArray(data) || data.length === 0) {
        list.innerHTML = '<li>No portfolio data found.</li>';
        return;
      }
      data.forEach(crypto => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="crypto-info">${crypto.name} (${crypto.symbol.toUpperCase()})</span> <span class="crypto-price">$${crypto.price.toFixed(2)}</span>`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      const list = document.getElementById('crypto-list');
      list.innerHTML = `<li>Error loading portfolio: ${err.message}</li>`;
    });
});