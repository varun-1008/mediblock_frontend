import { useContext, useState } from "react";
import AccountContext from "@/context/account";
import { useRouter } from "next/router";
import Link from "next/link";
import { Web3Storage } from "web3.storage";


function RegisterDoctor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [license, setLicense] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
  const { roleC, setRoleC, contractC, signerC } = useContext(AccountContext);

  function handleSubmit(event) {
    event.preventDefault();

    (async () => {
      try {
        const client = new Web3Storage({
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVjOTQyQjRCYjNjMzcwZkVjRTA1OTg0NEE3ZGQxMTRDOGViODBkM0UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTgyNDA5NTk2MjEsIm5hbWUiOiJ0ZXN0In0.Gh4u7zwJ2jdKrMbdFXgLvaeHmic8L6OQ3EpzU3Qyjl0",
        });

        const obj = { name, email, speciality, license, phone, gender };
        const blob = new Blob([JSON.stringify(obj)], {
          type: "application/json",
        });
        const files = [
          new File([blob], 'info.json')
        ]

        const cid = await client.put(files);

        const tx = await contractC.connect(signerC).doctorRegistration(cid);
        await tx.wait();

        router.push("/");
        setRoleC(2);

      } catch (error) {
        console.error(error);
      }
    })();
  }

  if (roleC === -1) return <h1>Unable to fetch role</h1>;

  if (roleC > 0) {
    return (
      <>
        <h1>Already registered</h1>
        <Link href="/">Go to home</Link>
      </>
    );
  }

  return (
    <>
      <h1>Register Doctor</h1>
      <form className="flex flex-col">
        <label>Enter name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-6"
        />
        <label>Enter email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-6"
        />
        <label>Enter speciality</label>
        <input
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          className="mb-10"
        />
        <label>Enter license</label>
        <input
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          className="mb-10"
        />
        <label>Enter phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-6"
        />
        <label>Enter gender</label>
        <input
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mb-10"
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
}

export default RegisterDoctor;
