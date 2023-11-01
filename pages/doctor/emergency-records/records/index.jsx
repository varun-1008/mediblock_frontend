import AccountContext from "@/context/account";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

function EmergencyRecords() {
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
          console.log(router.query.PatientAddress);
          const value = await contractC
            .connect(signerC)
            .getEmergencyRecords(router.query.PatientAddress);

          const records = [];
          for (let index = 0; index < value[0].length; ++index) {
            records.push({
              index,
              title: value[0][index],
              time: new Date(+value[1][index]).toLocaleDateString(),
              linkIndex: parseInt(value[2][index]),
              recordIndex: parseInt(value[3][index]),
            });
          }

          console.log(value);
          console.log(records);

          setData(records);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  });

  if (data === undefined) return <h1>fetching</h1>;

  return (
    <>
      <h1>Emergency records</h1>
      {data.map((value) => (
        <div
          key={value.index}
          className={"flex flex-row justify-between mb-6"}
        >
          <span className="w-1/3">{value.title}</span>
          <span className="w-1/3">{value.time}</span>
          <Link
            href={{
              pathname: "records/record",
              query: {
                PatientAddress: router.query.PatientAddress,
                linkIndex: value.linkIndex,
                recordIndex: value.recordIndex,
              },
            }}
          >
            <button>View</button>
          </Link>
        </div>
      ))}
    </>
  );
}

export default EmergencyRecords;
