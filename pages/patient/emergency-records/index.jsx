import AccountContext from "@/context/account";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

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
          const value = await contractC
            .connect(signerC)
            .getEmergencyRecords(addressC);

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

          setData(records);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  });

  function handleRemove(linkIndex, recordIndex) {
    (async () => {
      try {
        await contractC
          .connect(signerC)
          .removeEmergencyRecord(linkIndex, recordIndex);

        const newData = data.filter((item) => {
          return !(item.linkIndex === linkIndex && item.recordIndex === recordIndex);
        });
        setData(newData);
      } catch (error) {
        console.error(error);
      }
    })();
  }

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
              pathname: "emergency-records/record",
              query: {
                linkIndex: value.linkIndex,
                recordIndex: value.recordIndex,
              },
            }}
          >
            <button>View</button>
          </Link>
          <button
            onClick={() => handleRemove(value.linkIndex, value.recordIndex)}
          >
            Remove
          </button>
        </div>
      ))}
    </>
  );
}

export default EmergencyRecords;
