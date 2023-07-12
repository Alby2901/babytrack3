import axios from "axios";

// const BASE_URL = "http://pinocomo.ddns.net:9999/babysafe/login?user=pino&pwd=pino";
// const BASE_URL = "http://pinocomo.ddns.net:9999/babysafe/login";
// const BASE_URL = "http://172.31.234.97:8084/babysafe/login";
const BASE_URL = "http://130.0.151.40:8090/babysafe/login";

// http://10.6.10.135:8080/babysafe/checkband?sessionid=656ceef5-f87d-4cc0-87fc-3edaf414ffcd&child=2021025214&parent=322857

export async function getSession(utente, password, url) {
  const response = await axios.get(url, {
    params: {
      user: utente,
      pwd: password,
    },
  });

  console.log("-------------------------------------------------");
  console.log("Risposta: " + JSON.stringify(response.data));
  console.log("-------------------------------------------------");

  for (const param in response.data) {
    console.log("param: " + param);
  }

  console.log("param_ret: " + response.data.ret);
  console.log("param_msg: " + response.data.message);
  console.log("param_prm: " + response.data.params);

  const message = response.data.message;
  let sessionID = "";
  let cognome = "";
  let nome = "";

  if (response.data.ret !== 0) {
    console.log("Ret: ", response.data.ret);
    sessionID = "";
  } else {
    console.log("Ret: ", response.data.ret);
    sessionID = response.data.params.sessionId;
    cognome = response.data.params.user.cognome;
    nome = response.data.params.user.nome;
  }

  console.log("SessionID: " + sessionID);
  console.log("COGNOME: " + cognome);
  console.log("NOME: " + nome);

  return [sessionID, message, cognome, nome];
}

const CHK_PAR_URL = "http://130.0.151.40:8090/babysafe/checkband";

export async function getChkParent(sessionid, neoanto, genitore) {

  // http://130.0.151.40:8090/babysafe/checkband?sessionid=304ce6ec-a6fc-448c-b0b2-cbde5e86983c&child=2021025214&parent=322857

  const response = await axios.get(CHK_PAR_URL, {
    params: {
      sessionid: sessionid,
      child: neoanto,
      parent: genitore,
    },
  });

  console.log("-------------------------------------------------");
  console.log("Risposta chk gen: " + JSON.stringify(response.data));
  console.log("-------------------------------------------------");

  for (const param in response.data) {
    console.log("param: " + param);
  }

  console.log("param_ret: " + response.data.ret);
  console.log("param_msg: " + response.data.message);
  console.log("param_prm: " + response.data.params);

  const message = response.data.message;
  const ret = response.data.ret.toString();

  let childName = "";
  let motherName = "";

  if (response.data.ret !== 0) {
    console.log("Ret: ", response.data.ret);
  } else {
    console.log("Ret: ", response.data.ret);

    childName = response.data.params.childName;
    motherName = response.data.params.motherName;
  }

  console.log("CHILD-NAME: " + childName);
  console.log("MOTHER_NAME: " + motherName);

  // {"ret":0,"message":"Braccialetto madre riconosciuto ","params":{"childName":"Neonato Bimbo","motherName":"Rossi Maria"}}

  return [ ret, message, childName, motherName];
}
