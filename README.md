# Minimal Crypto Portfolio Tracker

This is a minimal static web app that displays a list of cryptocurrencies with their name, symbol, and current price.

## Files

- `index.html`: The main HTML file with a container (`#crypto-list`) for the portfolio list.
- `style.css`: Minimal styling for layout and readability.
- `script.js`: Fetches and loads the `portfolio.json` and displays at least 4 cryptocurrencies with prices.
- `portfolio.json`: (Provided attachment) Contains the cryptocurrency data.

## Usage

1. Place this app's folder with all files including `portfolio.json` in the same directory.
2. Open `index.html` directly in a modern web browser.
3. The app will load the portfolio data and display the cryptocurrencies dynamically.

## Notes

- The portfolio data is expected as an array of objects with `name`, `symbol`, and `price` fields.
- If the file cannot be loaded, an error message is shown.
- The app is minimal and fully functional without any build steps or servers.

## Checks

- The `#crypto-list` element exists and contains at least one `<li>` item after loading.

---