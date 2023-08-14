import { createContext, useState } from "react";

export const AuthContext = createContext({
  sessionID: "",
  urlsetted: "",
  sessionTimer: 10,
  isAuthenticated: false,
  cognome: "",
  nome: "",
  neonato: "",
  genitore: "",
  latte: "",
  readNeonato: () => { },
  readGenitore: () => { },
  readLatte: () => { },
  readSessionTimer: (timer) => { },
  authenticate: (sessionID) => { },
  readUrlSetted: () => { },
  logout: () => { },
  key1: "",
  mode: "",
  setKey1: () => { },
  setMode: () => { },
});

function AuthContentProvider({ children }) {
  const [authSessionIDs, setAuthSessionIDs] = useState();
  const [urlSetup, setUrlSetup] = useState();
  const [sessTimer, setSessTimer] = useState(10);
  
  const [cognome, setCognome] = useState();
  const [nome, setNome] = useState();
  const [neonato, setNeonato] = useState();
  const [genitore, setGenitore] = useState();
  const [latte, setLatte] = useState();

  const [key1State, setKey1State] = useState();
  const [mode1State, setMode1State] = useState();

  function authenticatef(sessionID, timer, cognome, nome) {
    setAuthSessionIDs(sessionID);
    setCognome(cognome);
    setNome(nome);
    setSessTimer(timer);
    // console.log('Auth-Context sessTimer status: ', sessTimer)
  }

  function readUrlSettf(urlp) {
    setUrlSetup(urlp);
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

  function setK1(key1p) {
    setKey1State(key1p);
  }

  function setM1(mode1p) {
    setMode1State(mode1p);
  }

  const value = {
    sessionID: authSessionIDs,
    urlsetted: urlSetup,
    sessionTimer: sessTimer,
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
    authenticate: authenticatef,
    readUrlSetted: readUrlSettf,
    logout: logout,
    key1: key1State,
    mode: mode1State,
    setKey1: setK1,
    setMode: setM1,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContentProvider;
