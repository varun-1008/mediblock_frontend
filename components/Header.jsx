import { ConnectWallet } from "@thirdweb-dev/react";

function Header() {
  return (
    <>
      <nav>
        <h1>MediBlock Secure</h1>
        <ConnectWallet />
      </nav>
    </>
  );
}

export default Header;
