const { createContext, useState } = require("react");

export const AuthContext = createContext({
  sessionID: "",
  isAuthenticated: false,
  cognome: "",
  nome: "",
  neonato: "",
  genitore: "",
  latte: "",
  readNeonato: () => {},
  readGenitore: () => {},
  readLatte: () => {},
  authenticate: (sessionID) => {},
  logout: () => {},
});

function AuthContentProvider({ children }) {
  const [authSessionIDs, setAuthSessionIDs] = useState();
  const [cognome, setCognome] = useState();
  const [nome, setNome] = useState();
  const [neonato, setNeonato] = useState();
  const [genitore, setGenitore] = useState();
  const [latte, setLatte] = useState();

  function authenticate(sessionID, cognome, nome) {
    setAuthSessionIDs(sessionID);
    setCognome(cognome);
    setNome(nome);
  }

  function logout() {
    setAuthSessionIDs(null);
  }

  function readNeo(neonato) {
    setNeonato(neonato);
  }

  function readGen(genitore) {
    setGenitore(genitore);
  }

  function readLat(latte) {
    setLatte(latte);
  }

  const value = {
    sessionID: authSessionIDs,
    isAuthenticated: !!authSessionIDs,
    cognome: cognome,
    nome: nome,
    neonato: neonato,
    genitore: genitore,
    latte: latte,
    readNeonato: readNeo,
    readGenitore: readGen,
    readLatte: readLat,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContentProvider;