# Minimal Crypto Portfolio Tracker

This is a minimal static web app that displays a list of cryptocurrencies with their name, symbol, and current price. The data is loaded from the `portfolio.json` file located alongside the app.

## Features

- Displays at least 4 cryptocurrencies
- Shows name, symbol (uppercase), and current price formatted with two decimals and a dollar sign
- Minimal styling for clear and readable layout

## How to run

1. Ensure `portfolio.json` is present in the same folder as the files.
2. Open `index.html` in any modern web browser.
3. The cryptocurrency list will load automatically.

## File structure

- `index.html`: main HTML file
- `style.css`: optional styling for better readability
- `script.js`: loads and renders the crypto portfolio from `portfolio.json`
- `README.md`: this file

## Notes

- No server required; the app works by opening the `index.html` file locally.
- If loading `portfolio.json` is blocked by browser security restrictions, consider running a local HTTP server.