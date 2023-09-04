import axios from "axios";
import { GlobalConstants } from "../UI/GlobalConstant";

// const BASE_URL = "http://pinocomo.ddns.net:9999/babysafe/login?user=pino&pwd=pino";
// const BASE_URL = "http://pinocomo.ddns.net:9999/babysafe/login";
// const BASE_URL = "http://172.31.234.97:8084/babysafe/login";
// const BASE_URL = "http://37.159.251.165:8090/babysafe/login";

// http://37.159.251.165:8090/babysafe/checkband?sessionid=304ce6ec-a6fc-448c-b0b2-cbde5e86983c&child=2021025214&parent=322857
// http://10.6.10.135:8080/babysafe/checkband?sessionid=656ceef5-f87d-4cc0-87fc-3edaf414ffcd&child=2021025214&parent=322857

export async function getSession(utente, password, url) {
  const urlComplete = url + '/' + GlobalConstants.paths.PATH_APP + '/' + GlobalConstants.paths.PATH_LOGIN;
  const response = await axios.get(urlComplete, {
    params: {
      user: utente,
      pwd: password,
    },
  });

  console.log("http: -------------------------------------------------");
  console.log("http: Risposta: " + JSON.stringify(response.data));
  console.log("http: -------------------------------------------------");

  for (const param in response.data) {
    console.log("http: param: " + param);
  }

  console.log("http: param_ret: " + response.data.ret);
  console.log("http: param_msg: " + response.data.message);
  console.log("http: param_prm: " + response.data.params);

  const message = response.data.message;
  let sessionID = "";
  let cognome = "";
  let nome = "";

  if (response.data.ret !== 0) {
    console.log("http: Ret If !0: ", response.data.ret);
    sessionID = "";
  } else {
    console.log("http: Ret If 0: ", response.data.ret);
    sessionID = response.data.params.sessionId;
    cognome = response.data.params.user.cognome;
    nome = response.data.params.user.nome;
  }

  console.log("http: SessionID: " + sessionID);
  console.log("http: COGNOME: " + cognome);
  console.log("http: NOME: " + nome);

  return [sessionID, message, cognome, nome];
}

// const CHK_PAR_URL = "http://37.159.251.165:8090/babysafe/checksession?sessionid=";

export async function checkSessionStatus(url, sessionID) {
  const urlComplete = url + '/' + GlobalConstants.paths.PATH_APP + '/' + GlobalConstants.paths.PATH_CHKSESSION;
  const response = await axios.get(urlComplete, {
    params: {
      sessionid: sessionID,
    },
  });

  console.log("http: --- CHECK SESSION -------------------------------");
  console.log("http: --- Risposta: " + JSON.stringify(response.data));
  console.log("http: --- CHECK SESSION -------------------------------");

  return response.data;
}

// const CHK_PAR_URL = "http://130.0.151.40:8090/babysafe/checkband";

export async function getChkBaby(url, sessionid, neonato) {
  console.log('--------------- HTTP Component - getChkBaby - START --------------------------------------');
  console.log('--------------- HTTP Component - getChkBaby - axio.get START ---------------------');

  console.log('url: ', url);
  console.log('GlobalConstants.paths.PATH_APP: ', GlobalConstants.paths.PATH_APP);
  console.log('GlobalConstants.paths.PATH_VERIFY: ', GlobalConstants.paths.PATH_VERIFY);
  console.log('sessionid: ', sessionid);
  console.log('neonato: ', neonato);


  const urlComplete = url + '/' + GlobalConstants.paths.PATH_APP + '/' + GlobalConstants.paths.PATH_VERIFY;

  console.log('urlComplete: ', urlComplete);

  const response = await axios.get(urlComplete, {
    params: {
      sessionid: sessionid,
      child: neonato,
    },
  });

  console.log('--------------- HTTP Component - getChkBaby - axio.get - THE END ---------------------');
  

  console.log("http3: -------------------------------------------------");
  console.log("http3: Risposta chk gen: " + JSON.stringify(response.data));
  console.log("http3: -------------------------------------------------");

  for (const param in response.data) {
    console.log("http3: param: " + param);
  }

  console.log("http3: param_ret: " + response.data.ret);
  console.log("http3: param_msg: " + response.data.message);
  console.log("http3: param_prm: " + response.data.params);

  const message = response.data.message;
  const ret = response.data.ret.toString();

  let childName = "";
  let motherName = "";

  if (response.data.ret !== 0) {
    console.log("http3: Ret if ret !0: ", response.data.ret);
  } else {
    console.log("http3: Ret if ret =0: ", response.data.ret);

    childName = response.data.params.childName;
    motherName = response.data.params.motherName;
  }

  console.log("http3: CHILD-NAME: " + childName);
  console.log("http3: MOTHER_NAME: " + motherName);

  // {"ret":0,"message":"Braccialetto madre riconosciuto ","params":{"childName":"Neonato Bimbo","motherName":"Rossi Maria"}}
  
  console.log('--------------- HTTP Component - getChkBaby - THE END --------------------------------------');

  return [ret, message, childName, motherName];
}


export async function getChkParent(url, sessionid, neoanto, genitore) {

  const urlComplete = url + '/' + GlobalConstants.paths.PATH_APP + '/' + GlobalConstants.paths.PATH_CHECHBAND;
  const response = await axios.get(urlComplete, {
    params: {
      sessionid: sessionid,
      child: neoanto,
      parent: genitore,
    },
  });

  console.log("http2: -------------------------------------------------");
  console.log("http2: Risposta chk gen: " + JSON.stringify(response.data));
  console.log("http2: -------------------------------------------------");

  for (const param in response.data) {
    console.log("http2: param: " + param);
  }

  console.log("http2: param_ret: " + response.data.ret);
  console.log("http2: param_msg: " + response.data.message);
  console.log("http2: param_prm: " + response.data.params);

  const message = response.data.message;
  const ret = response.data.ret.toString();

  let childName = "";
  let motherName = "";

  if (response.data.ret !== 0) {
    console.log("http2: Ret if ret !0: ", response.data.ret);
  } else {
    console.log("http2: Ret if ret =0: ", response.data.ret);

    childName = response.data.params.childName;
    motherName = response.data.params.motherName;
  }

  console.log("http2: CHILD-NAME: " + childName);
  console.log("http2: MOTHER_NAME: " + motherName);

  // {"ret":0,"message":"Braccialetto madre riconosciuto ","params":{"childName":"Neonato Bimbo","motherName":"Rossi Maria"}}

  return [ret, message, childName, motherName];
}
