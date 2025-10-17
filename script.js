document.addEventListener('DOMContentLoaded', function () {
  const list = document.getElementById('crypto-list');
  const totalValueEl = document.getElementById('total-value');
  const sortPriceBtn = document.getElementById('sort-price');
  const filterGainLossBtn = document.getElementById('filter-gain-loss');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const loadingSpinner = document.getElementById('loading-spinner');
  const priceChartCtx = document.getElementById('price-chart').getContext('2d');

  let portfolioData = [];
  let filteredData = [];
  let sortAsc = true;
  let filterMode = 'all'; // 'all', 'gain', 'loss'
  let chartInstance = null;

  function showLoading(show) {
    loadingSpinner.style.display = show ? 'block' : 'none';
  }

  function formatCurrency(num) {
    return `$${num.toFixed(2)}`;
  }

  function updateTotalValue(data) {
    const total = data.reduce((sum, c) => sum + c.price * (c.amount || 1), 0);
    totalValueEl.textContent = `Total Portfolio Value: ${formatCurrency(total)}`;
  }

  function renderList(data) {
    list.innerHTML = '';
    if (!data.length) {
      list.innerHTML = '<li>No portfolio data found.</li>';
      updateTotalValue([]);
      updateChart([]);
      return;
    }
    data.forEach(crypto => {
      const li = document.createElement('li');
      // Show gain/loss if available
      let gainLossText = '';
      if (typeof crypto.price_change_24h === 'number') {
        const sign = crypto.price_change_24h >= 0 ? '+' : '';
        gainLossText = ` <span class="crypto-gain-loss" style="color:${crypto.price_change_24h >= 0 ? 'green' : 'red'}">(${sign}${crypto.price_change_24h.toFixed(2)}%)</span>`;
      }
      li.innerHTML = `<span class="crypto-info">${crypto.name} (${crypto.symbol.toUpperCase()})</span> <span class="crypto-price">${formatCurrency(crypto.price)}</span>${gainLossText}`;
      li.dataset.price = crypto.price;
      li.dataset.gainLoss = crypto.price_change_24h || 0;
      li.dataset.symbol = crypto.symbol;
      list.appendChild(li);
    });
    updateTotalValue(data);
    updateChart(data);
  }

  function sortData(data) {
    return data.slice().sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);
  }

  function filterData(data) {
    if (filterMode === 'gain') {
      return data.filter(c => c.price_change_24h > 0);
    } else if (filterMode === 'loss') {
      return data.filter(c => c.price_change_24h < 0);
    }
    return data;
  }

  function updateChart(data) {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
    if (!data.length) {
      return;
    }
    // Prepare datasets: for each crypto, plot historical prices
    // Assume each crypto has a 'history' array with { date: 'YYYY-MM-DD', price: number }
    // If no history, skip that crypto
    const datasets = data
      .filter(c => Array.isArray(c.history) && c.history.length > 0)
      .map(c => ({
        label: c.symbol.toUpperCase(),
        data: c.history.map(h => ({ x: h.date, y: h.price })),
        fill: false,
        borderColor: getColorForSymbol(c.symbol),
        tension: 0.1,
      }));

    if (!datasets.length) return;

    chartInstance = new Chart(priceChartCtx, {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        scales: {
          x: {
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              tooltipFormat: 'll',
              unit: 'day',
              displayFormats: {
                day: 'MMM d'
              }
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price (USD)'
            },
            beginAtZero: false
          }
        },
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        }
      }
    });
  }

  function getColorForSymbol(symbol) {
    // Simple hash to color for consistent colors per symbol
    const colors = [
      '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
      '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
      '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
      '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
    ];
    let hash = 0;
    for (let i = 0; i < symbol.length; i++) {
      hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  function applyFiltersAndSort() {
    let data = filterData(portfolioData);
    data = sortData(data);
    filteredData = data;
    renderList(data);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.textContent = 'Light Theme';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleBtn.textContent = 'Dark Theme';
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggleBtn.textContent = 'Dark Theme';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggleBtn.textContent = 'Light Theme';
    }
  }

  // Event Listeners
  sortPriceBtn.addEventListener('click', () => {
    sortAsc = !sortAsc;
    sortPriceBtn.textContent = `Sort by Price: ${sortAsc ? 'Asc' : 'Desc'}`;
    applyFiltersAndSort();
  });

  filterGainLossBtn.addEventListener('click', () => {
    if (filterMode === 'all') {
      filterMode = 'gain';
      filterGainLossBtn.textContent = 'Filter: Gains';
    } else if (filterMode === 'gain') {
      filterMode = 'loss';
      filterGainLossBtn.textContent = 'Filter: Losses';
    } else {
      filterMode = 'all';
      filterGainLossBtn.textContent = 'Filter: All';
    }
    applyFiltersAndSort();
  });

  themeToggleBtn.addEventListener('click', toggleTheme);

  // Initial UI setup
  sortPriceBtn.textContent = 'Sort by Price: Asc';
  filterGainLossBtn.textContent = 'Filter: All';
  loadTheme();

  // Fetch portfolio data
  showLoading(true);
  fetch('./portfolio.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      showLoading(false);
      if (!Array.isArray(data) || data.length === 0) {
        list.innerHTML = '<li>No portfolio data found.</li>';
        updateTotalValue([]);
        return;
      }
      portfolioData = data.map(c => ({
        name: c.name,
        symbol: c.symbol,
        price: c.price,
        price_change_24h: c.price_change_24h ?? 0,
        amount: c.amount ?? 1,
        history: Array.isArray(c.history) ? c.history : []
      }));
      applyFiltersAndSort();
    })
    .catch(err => {
      showLoading(false);
      list.innerHTML = `<li>Error loading portfolio: ${err.message}</li>`;
      updateTotalValue([]);
    });
});