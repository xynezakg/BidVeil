# How to Use Bidveil

A non-technical, step-by-step guide to participating in zero-knowledge confidential sealed-bid procurement on the Midnight Network.

---

## What You Need

1. **A Web Browser** (Chrome, Brave, Edge, or Firefox).
2. **Lace Midnight Wallet Extension**: Installed and configured in your browser.
3. **Preprod tNIGHT Tokens**: For testnet transaction gas (available via the official Midnight faucet at `https://faucet.preprod.midnight.network`).
4. **Internet Connection**: To communicate with Midnight Preprod indexer nodes and proof servers.

> 🎬 **Prefer a video walkthrough?** Watch the full demonstration here: [`docs/vid/bidveil-demo.mp4`](vid/bidveil-demo.mp4).

---

## Step-by-Step Guide

### 1. Launch the Application
- Open the live web app: [https://bidveil.vercel.app/](https://bidveil.vercel.app/)
- Click **"Launch App"** or switch to the **"Sealed-Bid Terminal"** tab.

### 2. Connect Your Lace Midnight Wallet
- Click the **"Connect Lace Wallet"** button in the top wallet card.
- A popup from the Lace Midnight extension will prompt you to approve the connection.
- Once connected, your unshielded address (`mn_addr_...`) and live `tNIGHT` token balance will be displayed.

### 3. Select an Active Procurement Tender
- Browse through the **Active Sealed-Bid Tenders** listed in the terminal (e.g., *Global Cloud Infrastructure & Edge Servers*, *Clean Energy Microgrid*, or *Cybersecurity Audit*).
- Select the tender you wish to bid on to view its minimum qualifying reserve price and current on-chain verified bid metrics.

### 4. Enter Your Confidential Bid Amount
- In the **Confidential Supplier Bid Amount (USD)** input field, type your secret proposal amount (must meet or exceed the tender's reserve price).
- Notice the **"ZK Shielded"** and **"Private Witness Input"** badges. This figure is kept exclusively inside your local browser memory.

### 5. Submit Your Zero-Knowledge Sealed Bid
- Click **"Submit Zero-Knowledge Sealed Bid"**.
- Your browser will locally synthesize the zk-SNARK proof verifying that your bid satisfies the tender constraints without leaking the amount.
- Approve the zero-knowledge transaction in your Lace wallet.
- Once confirmed on-chain, the public **Verified Public Bids** counter increments, and a transaction hash is provided with a direct link to the Midnight Explorer.

---

## What Gets Proved (and What Stays Private)

### What Stays 100% PRIVATE (Never On-Chain)
- **Exact Bid Amount**: Competitors, government observers, and network validators never see the numerical dollars or valuation you submitted.
- **Bidder Salt & Private State**: Your local secret randomness (`secretBidSalt`) and witness state remain strictly on your device.
- **Supplier Pricing Strategy**: Bidders cannot be front-run or undercut by observers sniffing the mempool.

### What Gets PROVED (Verifiable by Anyone)
- **Constraint Compliance**: The transaction cryptographically proves that the private bid amount is greater than or equal to the public reserve price (`bid >= reservePrice`).
- **Tender Validity**: Proves that the procurement tender is currently open and accepting bids.
- **Correct State Transition**: The contract’s public verified bid counter increments by exactly 1 without exposing who submitted which amount.

---

## Troubleshooting

### Issue: "Lace Midnight extension was not detected"
- **Solution**: Ensure the Lace Midnight extension is installed and enabled for `https://bidveil.vercel.app/`. If you are running locally or on unsupported mobile browsers, the application automatically enters Preprod simulation mode.

### Issue: "Bid amount is below the minimum reserve price"
- **Solution**: The Compact zero-knowledge circuit enforces that any secret bid must be equal to or higher than the tender's minimum reserve price (e.g., $\ge \$100,000$). Increase your bid amount and re-submit.

### Issue: "Insufficient balance for transaction gas"
- **Solution**: Visit the Midnight Preprod Faucet (`https://faucet.preprod.midnight.network`) and paste your unshielded Lace address (`mn_addr_...`) to receive free testnet `tNIGHT`.
