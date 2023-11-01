import { useContext, useState } from "react";
import { Web3Storage } from "web3.storage";
import AccountContext from "@/context/account";
import { useRouter } from "next/router";

function CreateRecord() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  const router = useRouter();
  const { AppointedPatientAddress } = router.query;

  const { contractC, signerC } = useContext(AccountContext);

  function handleSubmit(event) {
    event.preventDefault();

    (async () => {
      try {
        const client = new Web3Storage({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVjOTQyQjRCYjNjMzcwZkVjRTA1OTg0NEE3ZGQxMTRDOGViODBkM0UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTgyNDA5NTk2MjEsIm5hbWUiOiJ0ZXN0In0.Gh4u7zwJ2jdKrMbdFXgLvaeHmic8L6OQ3EpzU3Qyjl0",
        });

        const blob = new Blob([content], {
          type: "text/plain",
        });
        const files = [new File([blob], "content.txt")];

        if (image !== undefined) {
          const blob = new Blob([image], {
            type: "image/png",
          });
          files.push(new File([blob], "image.png"));
        }

        const cid = await client.put(files);
        // console.log(cid);

        const time = new Date().getTime();
        const tx = await contractC.connect(signerC).addRecordNewLink(AppointedPatientAddress, title, time.toString(), cid);
        await tx.wait();

        router.push("/doctor/appointments");
      } catch (error) {
        console.error(error);
      }
    })();
  }

  function handleChoose(e) {
    const file = e.target.files[0];

    (async () => {
      const value = await file.arrayBuffer();
      const buffer = Buffer.from(value);

      setImage(buffer);
    })();
  }

  return (
    <>
      <h1>Create record</h1>
      <form className="flex flex-col">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-6"
        />
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-6"
        />
        <input
          type="file"
          onChange={handleChoose}
          className="mb-6"
        />
        {image !== undefined && (
          <img
            src={`data:image/png;base64,${image.toString("base64")}`}
            className="mb-6 w-2/6"
          ></img>
        )}
        <button onClick={handleSubmit}>Create</button>
      </form>
    </>
  );
}

export default CreateRecord;
