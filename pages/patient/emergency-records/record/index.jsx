import DisplayRecord from "@/components/Record";
import AccountContext from "@/context/account";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

function EmergencyRecord() {
  const [data, setData] = useState();
  const router = useRouter();
  const { addressC, contractC, signerC } = useContext(AccountContext);

  useEffect(() => {
    if (
      addressC !== undefined &&
      contractC !== "undefined" &&
      data === undefined
    ) {
      (async () => {
        try {
          setData(true);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  });

  if (data === undefined) return <h1>fetching</h1>;

  return (
    <>
      <DisplayRecord
        address={addressC}
        linkIndex={router.query.linkIndex}
        recordIndex={router.query.recordIndex}
      />
    </>
  );
}

export default EmergencyRecord;
