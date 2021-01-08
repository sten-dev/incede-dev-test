//dev
export const API_URL = "https://incede-api-tired-leopard.mybluemix.net/";

// local
// export const API_URL = "http://localhost:8080/";

export const WEB_URL = "https://incede.ai/";

export const DEMO_SOCKET_URL = "wss://cc-api.mybluemix.net";
export const SOCKET_PATHS = {
  CONNECT: "CONNECT_BOT",
  BOT_RESPONSE: "BOT_RESPONSE",
  CONNECT_ROOMS: "CONNECT_ROOMS", // talk to agent active rooms
  GET_ROOMS: "GET_ROOMS",
  NEW_ROOMS: "NEW_ROOMS",
  CONNECT_ALL_ROOMS: "CONNECT_ALL_ROOMS", // all active rooms
  GET_ALL_ROOMS: "GET_ALL_ROOMS",
  NEW_ALL_ROOMS: "NEW_ALL_ROOMS"
};

export const IF_USER_IS = {
  user: "USER",
  watson: "WATSON",
  agent: "AGENT"
};

export const USER_ABB = {
  [IF_USER_IS.agent]: "AG",
  [IF_USER_IS.user]: "US",
  [IF_USER_IS.watson]: "WA"
};

export const IGNORE_MSG = ["welcome_back", "agent_not_available"];

export const MEETING_MSG =
  "Sure thing. I need some basic information from you to setup a meeting.";

export const COGNOS_SOURCE = {
  id:
    "c962e5c7-65f4-4895-885d-4187b166d44b:e653bf07-0b24-4bd4-a3cd-b9d613e8a2a5:/INCEDE/CALL_TONE:table:CALL_TONE",
  user: "bluadmin",
  password: "ODg3ODcwZjBiNDlk",
  jdbc: {
    jdbcUrl:
      "jdbc:db2://dashdb-txn-flex-yp-dal10-720.services.dal.bluemix.net:50000/BLUDB",
    driverClassName: "com.ibm.db2.jcc.DB2Driver",
    schema: "INCEDE"
  }
};

export const httpClient = async (
  url,
  type,
  obj = undefined,
  contentType = "application/json; charset=utf-8"
) => {
  try {
    type = type.toUpperCase();
    if (type.toLowerCase() === "get" && obj) {
      var params = Object.keys(obj)
        .map(function(key) {
          return key + "=" + obj[key];
        })
        .join("&");
      url += "?" + params;
      obj = undefined;
    }
    let apiUrl = API_URL;
    let res = await fetch(apiUrl + url, {
      method: type.toUpperCase(),
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": contentType
      }
    });
    return await res.json();
  } catch (error) {
    console.group(`API ${type} Error`);
    console.error(error);
    console.groupEnd();
    throw error;
  }
};
