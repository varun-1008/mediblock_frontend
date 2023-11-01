import AccountContext from "@/context/account";
import { useContext, useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

function Record({ address, linkIndex, recordIndex }) {
  const [data, setData] = useState();
  const [image, setImage] = useState();
  const { contractC, signerC } = useContext(AccountContext);

  useEffect(() => {
    (async () => {
      try {
        const _data = await contractC
          .connect(signerC)
          .getRecord(address, linkIndex, recordIndex);

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
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (data === undefined) return <h1>fetching</h1>;

  return (
    <div className="flex flex-col space-y-4">
      <h1>Record</h1>
      <div>
        <label className="mr-2">Title :</label>
        <span>{data.title}</span>
      </div>
      <div>
        <label className="mr-2">Created At :</label>
        <span>{data.time}</span>
      </div>
      <label>Content</label>
      <textarea
        value={data.content}
        disabled
        rows={10}
      />
      {image !== undefined && (
        <>
          <label>Image</label>
          <img
            src={`data:image/png;base64,${image}`}
            className="w-1/2"
          />
        </>
      )}
    </div>
  );
}

export default Record;
