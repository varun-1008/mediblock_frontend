import AccountContext from "@/context/account";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

function PatientAppointments() {
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
          const doctorsAddresses = await contractC.getAppointedDoctors();

          const client = new Web3Storage({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVjOTQyQjRCYjNjMzcwZkVjRTA1OTg0NEE3ZGQxMTRDOGViODBkM0UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTgyNDA5NTk2MjEsIm5hbWUiOiJ0ZXN0In0.Gh4u7zwJ2jdKrMbdFXgLvaeHmic8L6OQ3EpzU3Qyjl0",
          });

          let index = 0;
          const doctorInfo = [];

          for (const doctorAddress of doctorsAddresses) {
            const cid = await contractC.getDoctorInfo(doctorAddress);
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

            const doctorObj = {
              index: index,
              address: doctorAddress,
              name: json.name,
              email: json.email,
              speciality: json.speciality,
              phone: json.phone,
              gender: json.gender,
            };

            doctorInfo.push(doctorObj);
            index++;
          }

          setData(doctorInfo);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  });

  function handleDelete(address) {
    (async () => {
      try {
        const tx = await contractC.connect(signerC).removeAppointment(address);
        await tx.wait();

        const newData = data.filter(item => item.address !== address);
        setData(newData);
      } catch (error) {
        console.error(error);
      }
    })();
  }

  if (data === undefined) return <h1>fetching</h1>;

  return (
    <>
      <h1>Patient Appointments</h1>
      <Link href="/patient/appointments/book">
        <button>Book an appointment</button>
      </Link>

      <h2>Active appointments</h2>
      <div className={"flex flex-row justify-between mb-8 w-5/6"}>
        <span>Name</span>
        <span>Email</span>
        <span>Speciality</span>
        <span>Phone</span>
        <span>Gender</span>
      </div>
      {data.map((value) => (
        <div
          key={value.index}
          className={"flex flex-row justify-between mb-6"}
        >
          <span>{value.name}</span>
          <span>{value.email}</span>
          <span>{value.speciality}</span>
          <span>{value.phone}</span>
          <span>{value.gender}</span>
          <button onClick={() => handleDelete(value.address)}>Cancel</button>
        </div>
      ))}
    </>
  );
}

export default PatientAppointments;
