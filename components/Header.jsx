import { ConnectWallet, useAddress, useChainId } from "@thirdweb-dev/react";
import { useContext, useEffect } from "react";
import AccountContext from "@/context/account";
import { abi, contractAddresses } from "@/constants";
import { ethers } from "ethers";
import { useRouter } from "next/router";

function Header() {
  const address = useAddress();
  const chainId = useChainId();
  const router = useRouter();

  const {
    setRoleC,
    setAddressC,
    setChainIdC,
    providerC,
    setProviderC,
    contractC,
    setContractC,
    setSignerC,
  } = useContext(AccountContext);
  console.log("header");

  useEffect(() => {
    console.log("========= header");
    const contractAddress = contractAddresses[31337];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    setProviderC(provider);
    setContractC(contract);
  }, []);

  // useEffect(() => {
  //   console.log("========= header d");
  //   setAddressC(address);
  //   setChainIdC(chainId);
  //   console.log("inside if");

  //   if (providerC) {
  //     const signer = providerC.getSigner();
  //     setSignerC(signer);
  //   }

  //   if (address !== undefined && chainId === 31337) {
  //     (async () => {
  //       try {
  //         const role = await contractC.role(address);
  //         console.log("role found = ", role);
  //         setRoleC(role);
  //       } catch (error) {
  //         console.error("In fetching role : Header.js");
  //         console.error(error);
  //         setRoleC(-1);
  //         router.push("/");
  //       }
  //     })();
  //   }
  // }, [address, chainId]);

  function handleConnect() {
    console.log("handle connect");

    if (window.ethereum) {
      console.log(window.ethereum);
      (async () => {
        const val = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(val);
      })();
    }
  }

  function handleCheck() {
    (async () => {
      const val = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log(val);
    })();
  }

  return (
    <div className="w-11/12 mx-auto py-3">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">MediBlock Secure</h1>
        {/* <ConnectWallet /> */}
        <button onClick={handleConnect}>Connect</button>
        <button onClick={handleCheck}>Check</button>
      </nav>
    </div>
  );
}

export default Header;
