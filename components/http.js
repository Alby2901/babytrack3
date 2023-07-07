import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";

// const BASE_URL = "http://pinocomo.ddns.net:9999/babysafe/login?user=pino&pwd=pino";
// const BASE_URL = "http://pinocomo.ddns.net:9999/babysafe/login";
const BASE_URL = "http://172.31.234.97:8084/babysafe/login";

export async function getSession(utente, password, url) {
  try {
    console.log('Url:', url);
    console.log('BASE_URL:', BASE_URL);
    const response = await axios.get(BASE_URL, {
      params: {
        user: utente,
        pwd: password,
      },
    });
    console.log(response);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('Data: ', error.response.data);
      console.log('Status: ', error.response.status);
      console.log('Header: ', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('Request: ', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error: ', error.message);
    }
    console.log('Config: ', error.config);
    console.log('JSON: ', error.toJSON());
  };

  //   console.log("-------------------------------------------------");

  //   console.log("Risposta: " + JSON.stringify(response));

  console.log("-------------------------------------------------");

  console.log("Risposta: " + JSON.stringify(response.data));

  console.log("-------------------------------------------------");

  for (const param in response.data) {
    console.log("param: " + param);
  }

  console.log("param: " + response.data.ret);
  console.log("param: " + response.data.message);
  console.log("param: " + response.data.params);

  const message = response.data.message;
  let sessionID = "";

  if (response.data.ret === -1) {
    console.log("Ret -1 ");
    sessionID = "";
  } else {
    console.log("Ret 0 ");
    sessionID = response.data.params.sessionId;
  }

  console.log("SessionID: " + sessionID);

  return [sessionID, message];
}
