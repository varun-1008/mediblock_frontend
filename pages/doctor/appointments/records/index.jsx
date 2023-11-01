import Link from "next/link";
import { useRouter } from "next/router";

function Records() {
  const router = useRouter();
  const { AppointedPatientAddress } = router.query;

  return (
    <>
      <Link
        href={{
          pathname: "/doctor/create-record",
          query: { AppointedPatientAddress, type: 1 },
        }}
      >
        <button>Add a new record</button>
      </Link>
    </>
  );
}

export default Records;
