import AccountContext from "@/context/account";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";
import RecordDisplay from "@/components/Record";

function Record() {
  const [data, setData] = useState();
  const [image, setImage] = useState();
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
          const _data = await contractC
            .connect(signerC)
            .getRecord(
              addressC,
              router.query.linkIndex,
              router.query.recordIndex
            );

          const isEmergency = await contractC
            .connect(signerC)
            .isEmergencyRecord(
              router.query.linkIndex,
              router.query.recordIndex
            );

          const client = new Web3Storage({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVjOTQyQjRCYjNjMzcwZkVjRTA1OTg0NEE3ZGQxMTRDOGViODBkM0UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTgyNDA5NTk2MjEsIm5hbWUiOiJ0ZXN0In0.Gh4u7zwJ2jdKrMbdFXgLvaeHmic8L6OQ3EpzU3Qyjl0",
          });

          const res = await client.get(_data[2]);

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

          if (files.length > 1) {
            const file = files[1];
            const value = await file.arrayBuffer();
            const buffer = Buffer.from(value);
            const img = buffer.toString("base64");
            setImage(img);
          }

          setData({
            title: _data[0],
            time: new Date(+_data[1]).toLocaleString(),
            content: txt,
            isEmergency,
          });
        } catch (error) {
          console.error(error);
        }
      })();
    }
  });

  function handleClick(isEmergency) {
    (async () => {
      try {
        if (isEmergency) {
          await contractC
            .connect(signerC)
            .removeEmergencyRecord(
              router.query.linkIndex,
              router.query.recordIndex
            );
        } else {
          await contractC
            .connect(signerC)
            .addEmergencyRecord(
              router.query.linkIndex,
              router.query.recordIndex
            );
        }

        setData({ ...data, isEmergency: !isEmergency });
      } catch (error) {
        console.error(error);
      }
    })();
  }

  if (data === undefined) return <h1>fetching</h1>;

  return (
    <>
      <div className="flex flex-col space-y-4">
        <RecordDisplay
          address={addressC}
          linkIndex={router.query.linkIndex}
          recordIndex={router.query.recordIndex}
        />

        <button
          className="w-2/6"
          onClick={() => handleClick(data.isEmergency)}
        >
          {data.isEmergency
            ? "Unmark as emergency record"
            : "Mark as emergency record"}
        </button>
      </div>
    </>
  );
}

export default Record;
