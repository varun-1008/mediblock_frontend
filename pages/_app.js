import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import "@/styles/globals.css";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThirdwebProvider
        activeChain={{
          chainId: 31337,
          rpc: ["http://127.0.0.1:8545/"],

          // === Information for adding the network to your wallet (how it will appear for first time users) === \\
          // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
          nativeCurrency: {
            decimals: 18,
            name: "ETH",
            symbol: "ETH",
          },
          shortName: "localhost", // Display value shown in the wallet UI
          slug: "", // Display value shown in the wallet UI
          testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
          chain: "ConsenSys", // Name of the network
          name: "localhost testnet", // Name of the network
        }}
        clientId="2b3a9c0a945e13740a28585def1f1ad2"
        supportedWallets={[metamaskWallet()]}
      >
        <Header />
        <Component {...pageProps} />
      </ThirdwebProvider>
    </>
  );
}
