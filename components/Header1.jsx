import { useContext, useEffect, useState } from "react";
import AccountContext from "@/context/account";
import { abi, contractAddresses } from "@/constants";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Link from "next/link";

function Header() {
  const [isConnnected, setIsConnected] = useState(false);
  const router = useRouter();

  const {
    setRoleC,
    addressC,
    setAddressC,
    providerC,
    setProviderC,
    contractC,
    setContractC,
    setSignerC,
  } = useContext(AccountContext);

  useEffect(() => {
    const contractAddress = contractAddresses[31337];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    setProviderC(provider);
    setContractC(contract);

    (async () => {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        const newRole = await contract.role(accounts[0]);
        setAddressC(accounts[0]);
        setRoleC(newRole);
        setSignerC(provider.getSigner());
        setIsConnected(true);
      }
    })();
  }, []);

  useEffect(() => {
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  });

  function handleAccountsChanged() {
    console.log("account changed");
    (async () => {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length === 0) {
        setAddressC(undefined);
        setRoleC(-1);
      } else {
        const newRole = await contractC.role(accounts[0]);
        console.log(newRole);
        setRoleC(newRole);
        setAddressC(accounts[0]);
        setSignerC(providerC.getSigner());
      }
      router.push("/");
    })();
  }

  function handleConnect() {
    (async () => {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setIsConnected(true);
      } catch (error) {
        console.error(error);
      }
    })();
  }

  return (
    <div className="w-11/12 mx-auto py-3">
      <nav className="flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-black"
        >
          MediBlock Secure
        </Link>
        {isConnnected && <p>{addressC}</p>}
        <button onClick={handleConnect}>
          {isConnnected ? "Connected" : "Connect"}
        </button>
      </nav>
    </div>
  );
}

export default Header;
