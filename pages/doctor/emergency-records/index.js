import AccountContext from "@/context/account";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

function EmergencyRecords() {
  const [data, setData] = useState();
  const { addressC, contractC, signerC } = useContext(AccountContext);

  useEffect(() => {
    if (
      addressC !== undefined &&
      contractC !== "undefined" &&
      data === undefined
    ) {
      (async () => {
        try {
          const patientAddresses = await contractC
            .connect(signerC)
            .getPatients();

          const client = new Web3Storage({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVjOTQyQjRCYjNjMzcwZkVjRTA1OTg0NEE3ZGQxMTRDOGViODBkM0UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTgyNDA5NTk2MjEsIm5hbWUiOiJ0ZXN0In0.Gh4u7zwJ2jdKrMbdFXgLvaeHmic8L6OQ3EpzU3Qyjl0",
          });

          let index = 0;
          const patientInfo = [];

          for (const patientAddress of patientAddresses) {
            const cid = await contractC.getPatientInfo(patientAddress);
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

            const patientObj = {
              index: index,
              address: patientAddress,
              name: json.name,
              email: json.email,
              phone: json.phone,
              gender: json.gender,
            };

            patientInfo.push(patientObj);
            index++;
          }

          setData(patientInfo);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  });

  if (data === undefined) return <h1>fetching</h1>;

  return (
    <>
      <h1>Patient list</h1>
      <div className="flex flex-col space-y-4">
        <div className={"flex flex-row justify-between w-4/5"}>
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Gender</span>
        </div>
        {data.map((value) => (
          <div
            key={value.index}
            className={"flex flex-row justify-between"}
          >
            <span>{value.name}</span>
            <span>{value.email}</span>
            <span>{value.phone}</span>
            <span>{value.gender}</span>
            <Link href={{
              pathname: "emergency-records/records",
              query: {
                PatientAddress : value.address
              }
            }}>
              <button>View</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default EmergencyRecords;
