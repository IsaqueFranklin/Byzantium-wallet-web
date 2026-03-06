# Byzantium

**Next.js 15+** | **Arkade SDK** | **License: MIT**


<div align="center">
  <img src="https://raw.githubusercontent.com/IsaqueFranklin/Byzantium-wallet/main/public/constantinople.jpg" alt="Constantinople" width="350" style="border-radius: 12px; margin-bottom: 20px;" />
</div>

> "It is with their coin that all the nations carry on their trade, and it is received everywhere from one end of the earth to the other."
> — **Cosmas Indicopleustes** (c. 550 AD)

---

⚠️ **WORK IN PROGRESS (WIP)**  
This project is currently in active development. It is an experimental web-based Bitcoin wallet interface leveraging the Ark protocol. Use only with **Mutinynet** funds.

## 🛠️ Tech Stack & Implementation

Byzantium is built as a lightweight, modern interface for interacting with the Ark protocol. The project focuses on a seamless user experience for off-chain Bitcoin transactions without the liquidity constraints of traditional payment channels.

- **Framework**: [Next.js 15](https://nextjs.org/) using the **App Router** for efficient routing and server-side rendering where applicable.
- **Scaling Protocol**: Powered by the [@arkade-os/sdk](https://arkade.sh/), enabling fast and private off-chain transactions via the Ark protocol.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) for a utility-first, performant, and responsive design.
- **Data Visualization**: Integrated with [Recharts](https://recharts.org/) for visualizing transaction history and wallet activity.
- **Icons**: [Lucide React](https://lucide.dev/) for a consistent and clean iconography set.

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20.x or higher
- **npm**: v10.x or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bitcoin-indie/byzantium-wallet-web.git
   cd byzantium-wallet-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚰 Faucet & Testing

To test the wallet functionality on Mutinynet, you will need Ark-enabled coins. 

1. Visit the [Arkade-OS Wallet](https://arkade.money/).
2. In the **ArkadeOS Wallet Faucet** section, you must switch the server to use the same ASP (Ark Server) that Byzantium is using: `https://mutinynet.arkade.sh`.
3. Use the built-in **Faucet** to receive some Mutinynet Ark coins.
4. Once you have coins in the Arkade-OS wallet, you can send them to your Byzantium wallet address to test incoming and outgoing transactions.

---

*This README was authored by Gemini CLI.*
