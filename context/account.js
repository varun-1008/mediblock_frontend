import { createContext, useState } from "react";

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [addressC, changeAddress] = useState();
  const [chainIdC, changeChainId] = useState();
  const [roleC, changeRole] = useState(-1);
  const [providerC, changeProvider] = useState();
  const [contractC, changeContract] = useState();
  const [signerC, changeSigner] = useState();

  const valueToShare = {
    addressC,
    setAddressC: (newAddress) => {
      changeAddress(newAddress);
    },
    chainIdC,
    setChainIdC: (newChainId) => {
      changeChainId(newChainId);
    },
    roleC,
    setRoleC: (newRole) => {
      changeRole(newRole);
    },
    providerC,
    setProviderC : (newProvider) => {
       changeProvider(newProvider);
    },
    contractC,
    setContractC : (newContract) => {
      changeContract(newContract);
    },
    signerC,
    setSignerC : (newSigner) => {
      changeSigner(newSigner);
    },
  };

  return (
    <AccountContext.Provider value={valueToShare}>
      {children}
    </AccountContext.Provider>
  );
}

export { AccountProvider };
export default AccountContext;
