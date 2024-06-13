# Metacrafters EVM intermediate -AVAX proof project

This project is a basic decentralized application (DApp) that interacts with an Ethereum smart contract to provide basic ATM functionalities: deposit, withdraw, and fetch balance. Additionally, it fetches the current value of ETH in BTC using an online API.

## Features

- Connect to MetaMask wallet
- Deposit and withdraw 1 ETH from your account
- Display account balance
- Fetch and display the current value of 1 ETH in BTC

## Prerequisites
- Node.js and npm
- MetaMask browser extension
- An Ethereum account with some ETH for transactions


## Running the DApp

1. Start the local development server:
    ```sh
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Make sure you have MetaMask installed and configured.
2. Open the DApp in your browser.
3. Connect your MetaMask wallet by clicking the connect button.
4. Use the deposit and withdraw buttons to interact with the smart contract.
5. Click the fetch/update button to get the current value of 1 ETH in BTC.

## Code Overview

### `HomePage` Component

- **State Variables:**
  - `ethWallet`: Stores the user's Ethereum wallet.
  - `account`: Stores the connected account.
  - `atm`: Stores the contract instance.
  - `balance`: Stores the user's ETH balance.
  - `value`: Stores the fetched value of ETH in BTC.

- **Functions:**
  - `getWallet()`: Checks for MetaMask and sets the wallet.
  - `handleAccount(account)`: Handles account connection.
  - `connectAccount()`: Connects the MetaMask wallet.
  - `getATMContract()`: Gets the contract instance.
  - `getBalance()`: Fetches the user's balance from the contract.
  - `deposit()`: Deposits 1 ETH into the contract.
  - `withdraw()`: Withdraws 1 ETH from the contract.
  - `mfetch()`: Fetches the current value of 1 ETH in BTC using an online API.

- **Effect Hooks:**
  - `useEffect()`: Initializes the wallet connection when the component mounts.

### Styling

The component uses inline styles and JSX for styling elements such as buttons, container, and text.

## License

This project is licensed under the MIT License.
