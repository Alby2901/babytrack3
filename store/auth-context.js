const { createContext, useState } = require("react");

export const AuthContext = createContext({
  sessionID: "",
  isAuthenticated: false,
  cognome: "",
  nome: "",
  authenticate: (sessionID) => {},
  logout: () => {},
});

function AuthContentProvider({ children }) {
  const [authSessionIDs, setAuthSessionIDs] = useState();
  const [cognome, setCognome] = useState();
  const [nome, setNome] = useState();

  function authenticate(sessionID, cognome, nome) {
    setAuthSessionIDs(sessionID);
    setCognome(cognome);
    setNome(nome);
  }

  function logout() {
    setAuthSessionIDs(null);
  }

  const value = {
    sessionID: authSessionIDs,
    isAuthenticated: !!authSessionIDs,
    cognome: cognome,
    nome: nome,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContentProvider;
