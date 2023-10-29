import {
  useContractRead,
  useContract,
  useChainId,
  useAddress,
} from "@thirdweb-dev/react";
import { contractAddresses, abi } from "@/constants/index";
import Head from "next/head";
import RoleContext from "@/context/role";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Home() {
  const address = useAddress();
  const chainId = useChainId();
  const router = useRouter();
  const {role, setRole} = useContext(RoleContext);

  const contractAddress = contractAddresses[chainId];
  const { contract } = useContract(contractAddress, abi);
  const { data, isLoading, error } = useContractRead(contract, "role", [
    address,
  ]);
  
  if (!address) return <h1>please log in</h1>;

  if (chainId != 31337) return <h1>Invalid chain Id</h1>;

  if (error) {
    console.error("Failed to read contract", error);
  }

  const roleMap = {
    0: "/register",
    1: "/patient",
    2: "/doctor",
  };

  // router.push(roleMap[data]);

  return (
    <>
      <Head>
        <title>MediBlock Secure</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      {address ? address : "No account"}
      <br></br>
      {chainId ? chainId : "No chain Id"}
      <br></br>
      {data}
      <br></br>
      {role}
    </>
  );
}
