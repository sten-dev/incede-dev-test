import { httpClient } from "./src/constants";

export const getRoomChats = async obj => {
  let response = await httpClient("chats", "POST", obj);
  // console.warn("response", response);
  return response;
};

export const joinOrExitRoomChats = async obj => {
  let response = await httpClient("chats", "PATCH", obj);
  // console.warn("response", response);
  return response;
};

export const exitRoomChats = async obj => {
  console.warn("obj", obj);
  let response = await httpClient("rooms", "PATCH", obj);
  return response;
};

export const getDemoChats = async () => {
  let response = await httpClient("demo-chats", "GET");
  return response;
};

export const loginAgent = async (obj) => {
  let response = await httpClient("auth-agents", "POST", obj);
  return response;
};