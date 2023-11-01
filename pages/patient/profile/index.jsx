import AccountContext from "@/context/account";
import { useContext, useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

function PatientProfile() {
  const [data, setData] = useState();
  const { addressC, contractC } = useContext(AccountContext);

  useEffect(() => {
    if (addressC !== undefined && contractC !== "undefined" && data === undefined) {
      (async () => {
        try {
          const cid = await contractC.getPatientInfo(addressC);

          const client = new Web3Storage({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVjOTQyQjRCYjNjMzcwZkVjRTA1OTg0NEE3ZGQxMTRDOGViODBkM0UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTgyNDA5NTk2MjEsIm5hbWUiOiJ0ZXN0In0.Gh4u7zwJ2jdKrMbdFXgLvaeHmic8L6OQ3EpzU3Qyjl0",
          });

          const res = await client.get(cid);

          if (!res.ok) {
            throw new Error(
              `failed to get ${cid} - [${res.status}] ${res.statusText}`
            );
          }

          const files = await res.files();
          const file = files[0];

          const value = await file.arrayBuffer();
          const buffer = Buffer.from(value);
          const txt = buffer.toString("ascii");
          const json = JSON.parse(txt);

          setData(json);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  });

  if (data === undefined) return <h1>fetching</h1>;

  return (
    <>
      <h1>Patient profile</h1>
      <p>Name : {data.name} </p>
      <p>Email : {data.email} </p>
      <p>Phone : {data.phone} </p>
      <p>Gender : {data.gender} </p>
    </>
  );
}

export default PatientProfile;
