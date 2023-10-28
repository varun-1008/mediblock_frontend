import { useState } from "react";
import Header from "./Header";

function Layout({ children }) {
  const [role, setRole] = useState(0);
  return (
    <>
      <Header
        role={role}
        setRole={setRole}
      />
      <main role={role} setRole={setRole}>{children}</main>
    </>
  );
}

export default Layout;
