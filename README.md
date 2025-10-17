# Crypto Portfolio Tracker

This is a minimal static web application that displays a list of cryptocurrencies with their name, symbol, and current price.

## Features

- Loads portfolio data from `portfolio.json` located in the same folder.
- Displays each cryptocurrency as a list item inside the `#crypto-list` element.
- Fully functional by simply opening `index.html` in a modern browser.

## How to Use

1. Ensure `portfolio.json` is placed in the same directory as the files.
2. Open `index.html` in your web browser.

The app will automatically fetch and display the portfolio data.

## Structure

- `index.html`: Main HTML file with the container for the crypto list.
- `style.css`: Minimal styling for a clean and readable layout.
- `script.js`: Fetches and renders portfolio data from `portfolio.json`.
- `portfolio.json`: Data file containing portfolio info.

## Notes

- The app requires no server; it runs fully locally.
- Modern browsers that support `fetch` API can run this app.

---

Enjoy tracking your cryptocurrencies!