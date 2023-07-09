import axios from 'axios';

// const BASE_URL = "http://pinocomo.ddns.net:9999/babysafe/login?user=pino&pwd=pino";
// const BASE_URL = "http://pinocomo.ddns.net:9999/babysafe/login";
// const BASE_URL = "http://172.31.234.97:8084/babysafe/login";
const BASE_URL = "http://130.0.151.40:8090/babysafe/login";

export async function getSession(utente, password,url) {
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
  let sessionID = '';

  if (response.data.ret !== 0) {
    console.log("Ret: ", response.data.ret);
    sessionID = "";
  } else {
    console.log("Ret: ", response.data.ret);
    sessionID = response.data.params.sessionId;
  }

  console.log("SessionID: " + sessionID);

  return [sessionID, message];
}
