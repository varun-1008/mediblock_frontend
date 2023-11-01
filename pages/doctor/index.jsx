import AccountContext from "@/context/account";
import Link from "next/link";
import { useContext } from "react";

function Doctor() {
  const { roleC } = useContext(AccountContext);

  if (roleC === -1) return <h1>Unable to fetch role</h1>;

  if (roleC === 0) {
    return (
      <>
        <h1>Please registered</h1>
        <Link href="/register">Register</Link>
      </>
    );
  }

  if (roleC !== 2) {
    return (
      <>
        <h1>Access denied</h1>
      </>
    );
  }

  return (<>
  <div className="flex flex-col">
    <Link href="/doctor/profile">Profile</Link>
    <Link href="/doctor/appointments">Appointments</Link>
    <Link href="/doctor/emergency-records">Emergency Records</Link>
  </div>
  </>);
}

export default Doctor;