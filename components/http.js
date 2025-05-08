import axios from "axios";
import { GlobalConstants } from "../UI/GlobalConstant";

// ------------------- LOGIN (get session) ------------------------
//
// http://172.31.234.97:8084/babysafe/login?user=pino&pwd=pino
//
// http://37.159.251.165:8090/babysafe/login?user=pino&pwd=pino
// http://10.6.10.8:7070/babysafe/login?user=pino&pwd=pino
// http://10.6.10.135:8080/babysafe/login?user=pino&pwd=pino
// ------------------- v v v v v ----------------------------------
export async function getSession(utente, password, url, deviceIdentification) {
  console.log('HTTP: GetSession => Start');
  const urlComplete = url + '/' + GlobalConstants.paths.PATH_APP + '/' + GlobalConstants.paths.PATH_LOGIN;

  console.log('HTTP: GetSession => utente: ', utente);
  console.log('HTTP: GetSession => password: ', password);
  console.log('HTTP: GetSession => urlComplete: ', urlComplete);
  console.log('HTTP: GetSession => deviceIdentification: ', deviceIdentification);

  console.log('HTTP: GetSession => Pre Axio.get ');
  try {
    const response = await axios.get(urlComplete, {
      params: {
        user: utente,
        pwd: password,
        deviceid: deviceIdentification
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
    let sessionTimeout = "";
    let cognome = "";
    let nome = "";

    if (response.data.ret !== 0) {
      console.log("http: Ret If !0: ", response.data.ret);
      sessionID = "";
    } else {
      console.log("http: Ret If 0: ", response.data.ret);
      sessionID = response.data.params.sessionId;
      sessionTimeout = response.data.params.sessionTimeout ? response.data.params.sessionTimeout : 1;
      cognome = response.data.params.user.cognome;
      nome = response.data.params.user.nome;
    }

    console.log("http: SessionID: " + sessionID);
    console.log("http: SessionTimeout: " + sessionTimeout);
    console.log("http: COGNOME: " + cognome);
    console.log("http: NOME: " + nome);

    return [sessionID, sessionTimeout, message, cognome, nome];

  } catch (error) {
    console.error("Error during axios request:", error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error; // Move this inside the catch block
  }

}

// ------------------- CHECK SESSION ------------------------------
//
// http://172.31.234.97:8084/babysafe/checksession?sessionid=
//
// http://37.159.251.165:8090/babysafe/checksession?sessionid=
//
// ------------------- v v v v v v v v v --------------------------
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

// ------------------- CHECK BABY ---------------------------------
//
// http://172.31.234.97:8084/babysafe/verifyband?sessionid=50cc8a1f-3239-45c9-ac98-31daeb2990b1&child=025504
//
// http://37.159.251.165:8090/babysafe/verifyband?sessionid=50cc8a1f-3239-45c9-ac98-31daeb2990b1&child=025504
//
// ------------------- v v v v v ----------------------------------
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

// ------------------- CHECK BABY AND PARENT ------------------------
//
// http://172.31.234.97:8084/babysafe/checkband?sessionid=50cc8a1f-3239-45c9-ac98-31daeb2990b1&child=025504&parent=322857
//
// http://37.159.251.165:8090/babysafe/checkband?sessionid=50cc8a1f-3239-45c9-ac98-31daeb2990b1&child=025504&parent=322857
//
// ------------------- v v v v v v ----------------------------------
export async function getChkParent(url, sessionid, neonato, genitore) {

  console.log('--------------- HTTP Component - getChkParent - START --------------------------------------');
  console.log('--------------- HTTP Component - getChkParent - axio.get START ---------------------');

  console.log('url: ', url);
  console.log('GlobalConstants.paths.PATH_APP: ', GlobalConstants.paths.PATH_APP);
  console.log('GlobalConstants.paths.PATH_CHECHBAND: ', GlobalConstants.paths.PATH_CHECHBAND);
  console.log('sessionid: ', sessionid);
  console.log('neonato: ', neonato);

  const urlComplete = url + '/' + GlobalConstants.paths.PATH_APP + '/' + GlobalConstants.paths.PATH_CHECHBAND;

  console.log('urlComplete: ', urlComplete);


  const response = await axios.get(urlComplete, {
    params: {
      sessionid: sessionid,
      child: neonato,
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

  console.log('--------------- HTTP Component - getChkBaby - THE END --------------------------------------');

  return [ret, message, childName, motherName];
}
