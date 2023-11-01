import AccountContext from "@/context/account";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function AllRecords() {
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
          const value = await contractC.connect(signerC).getRecords();

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

  if (data === undefined) return <h1>fetching</h1>;

  return (
    <>
      <h1>Records</h1>
      {data.map((value) => (
        <div
          key={value.index}
          className={"flex flex-row justify-between mb-6"}
        >
          <span className="w-1/3">{value.title}</span>
          <span className="w-1/3">{value.time}</span>
          <span className="w-1/6">{value.linkIndex}</span>
          <span className="w-1/6">{value.recordIndex}</span>
          <Link
            href={{
              pathname: "records/record",
              query: {
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

export default AllRecords;
