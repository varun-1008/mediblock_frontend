import { ConnectWallet } from "@thirdweb-dev/react";

function Header() {
  return (
    <div className="w-11/12 mx-auto py-3">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">MediBlock Secure</h1>
        <ConnectWallet />
      </nav>
    </div>
  );
}

export default Header;
