import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <nav className={styles.nav}>
        <h1>MediBlock Secure</h1>
        <ConnectWallet />
      </nav>
    </>
  );
}

export default Header;
