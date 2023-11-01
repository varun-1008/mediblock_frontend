import AccountContext from "@/context/account";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

function Register() {
  const { roleC } = useContext(AccountContext);

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
    <div>
      <h1>Register</h1>

      <Link href="/register/patient">
        <button>Patient</button>
      </Link>
      <Link href="/register/doctor">
        <button>Doctor</button>
      </Link>
    </div>
  );
}

export default Register;
