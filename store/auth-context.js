const { createContext, useState } = require("react");

export const AuthContext = createContext({
  sessionID: "",
  sessionTimer: 10,
  isAuthenticated: false,
  cognome: "",
  nome: "",
  neonato: "",
  genitore: "",
  latte: "",
  readNeonato: () => {},
  readGenitore: () => {},
  readLatte: () => {},
  readSessionTimer: (timer) => {},
  authenticate: (sessionID) => {},
  logout: () => {},
});

function AuthContentProvider({ children }) {
  const [authSessionIDs, setAuthSessionIDs] = useState();
  const [sessTimer, setSessTimer] = useState();
  const [cognome, setCognome] = useState();
  const [nome, setNome] = useState();
  const [neonato, setNeonato] = useState();
  const [genitore, setGenitore] = useState();
  const [latte, setLatte] = useState();

  function authenticate(sessionID, timer, cognome, nome) {
    setAuthSessionIDs(sessionID);
    setCognome(cognome);
    setNome(nome);
    setSessTimer(timer);
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

  function readSessTimer(timer) {
    console.log('timer', timer)
    setSessTimer(timer);
    console.log('CUCU!')
  }

  const value = {
    sessionID: authSessionIDs,
    sessionTimer: 5,
    isAuthenticated: !!authSessionIDs,
    cognome: cognome,
    nome: nome,
    neonato: neonato,
    genitore: genitore,
    latte: latte,
    readNeonato: readNeo,
    readGenitore: readGen,
    readLatte: readLat,
    readSessionTimer: readSessTimer,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContentProvider;
