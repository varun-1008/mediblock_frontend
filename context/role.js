import { createContext, useState } from "react";

const RoleContext = createContext();

function RoleProvider ({children}) {
  const [role, changeRole] = useState(0);

  const valueToShare = {
    role,
    setRole : (newRole) => {
      changeRole(newRole);
    },
  };

  return (
    <RoleContext.Provider value={valueToShare}>
      {children}
    </RoleContext.Provider>
  );
}

export {RoleProvider};
export default RoleContext;