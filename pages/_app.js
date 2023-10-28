import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import "@/styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThirdwebProvider
        activeChain={{
          chainId: 31337,
          rpc: ["http://127.0.0.1:8545/"],
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThirdwebProvider>
    </>
  );
}
