const { createContext, useState } = require("react");

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
  readNeonato: () => {},
  readGenitore: () => {},
  readLatte: () => {},
  readSessionTimer: (timer) => {},
  authenticate: (sessionID) => {},
  readUrlSetted: () => {},
  logout: () => {},
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContentProvider;
