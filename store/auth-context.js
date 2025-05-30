import { createContext, useState } from "react";

export const AuthContext = createContext({
  sessionID: "",
  urlsetted: "",
  sessionTimer: 10,
  lastActiveTime: null,
  setSessionTimer: () => {},
  setLastActiveTime: () => {},
  // lastActiveTime: new Date().getTime(),
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
  user:"",
  deviceid:"",
  setKey1: () => { },
  setMode: () => { },
  setUser: () => { },
  setdeviceID: () => { }
});

function AuthContentProvider({ children }) {
  const [authSessionIDs, setAuthSessionIDs] = useState();
  const [urlSetup, setUrlSetup] = useState();
  const [sessTimer, setSessTimer] = useState(8);
  const [lastActiveTime, setLastActiveTime] = useState(null);

  const [cognome, setCognome] = useState();
  const [nome, setNome] = useState();
  const [neonato, setNeonato] = useState();
  const [genitore, setGenitore] = useState();
  const [latte, setLatte] = useState();

  const [key1State, setKey1State] = useState();
  const [mode1State, setMode1State] = useState();
  const [userState, setUserState] = useState();
  const [deviceIDState, setDeviceIDState] = useState();

  function authenticatef(sessionID, timer, cognome, nome) {
    setAuthSessionIDs(sessionID);
    setCognome(cognome);
    setNome(nome);
    setSessTimer(timer);
    // console.log('Auth-Context sessTimer status: ', sessTimer)
  }

  function setSessionTimer(timer) {
    setSessTimer(timer); // Implementa correttamente la funzione per aggiornare sessTimer
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
    console.log('AUTH-CONTEXT-ReadSessionTimer - Pre "setSessionTimer" => param timer', timer)
    setSessTimer(timer);
    console.log('AUTH-CONTEXT-ReadSessionTimer - Post "setSessionTimer" CUCU!', timer)
  }

  function setK1(key1p) {
    setKey1State(key1p);
  }

  function setM1(mode1p) {
    setMode1State(mode1p);
  }

  function setUser1(mode1p) {
    setUserState(mode1p);
  }

  function setDeviceID1(deviceIDp) {
    setDeviceIDState(deviceIDp);
  }

  const value = {
    sessionID: authSessionIDs,
    urlsetted: urlSetup,
    sessionTimer: sessTimer,
    lastActiveTime,
    setSessionTimer,
    setLastActiveTime,
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
    user: userState,
    deviceid: deviceIDState,
    setKey1: setK1,
    setMode: setM1,
    setUser: setUser1,
    setdeviceID: setDeviceID1,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContentProvider;
