import AccountContext from "@/context/account";
import Link from "next/link";
import { useContext } from "react";

function Patient() {
  const { roleC } = useContext(AccountContext);

  if (roleC === -1) return <h1>Unable to fetch role</h1>;

  if (roleC === 0) {
    return (
      <>
        <h1>Please registere</h1>
        <Link href="/register">Register</Link>
      </>
    );
  }

  if (roleC !== 1) {
    return (
      <>
        <h1>Access denied</h1>
      </>
    );
  }

  return (<>
  <div className="flex flex-col">
    <Link href="/patient/profile">Profile</Link>
    <Link href="/patient/records">Records</Link>
    <Link href="/patient/appointments">Appointments</Link>
    <Link href="/patient/emergency-records">Emergency records</Link>
  </div>
  </>);
}

export default Patient;
