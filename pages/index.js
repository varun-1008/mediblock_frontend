import AccountContext from "@/context/account";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const { roleC, addressC, contractC } = useContext(AccountContext);

  const roleMap = {
    0: "/register",
    1: "/patient",
    2: "/doctor",
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (roleC !== -1)
      router.push(roleMap[roleC])
  });

  if(addressC === undefined) {
    return <h1>Please log in</h1>
  }

  if(contractC === undefined) {
    return <h1>connecting to contract</h1>
  }

  if(roleC === -1)
      return <h1>Unable to fetch role</h1>
  else
    return <h1>Connecting account and fetching data</h1>
}
