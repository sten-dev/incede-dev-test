import { httpClient } from './src/constants';

export const registerForWebinar = async obj => {
  let response = await httpClient('webinars/register', 'PUT', obj);
  // console.warn("response", response);
  return response;
};
export const getRoomChats = async obj => {
  let response = await httpClient('chats', 'POST', obj);
  // console.warn("response", response);
  return response;
};

export const joinOrExitRoomChats = async obj => {
  let response = await httpClient('chats', 'PATCH', obj);
  // console.warn("response", response);
  return response;
};

export const exitRoomChats = async obj => {
  console.warn('obj', obj);
  let response = await httpClient('rooms', 'PATCH', obj);
  return response;
};

export const getDemoChats = async () => {
  let response = await httpClient('demo-chats', 'GET');
  return response;
};

export const loginAgent = async obj => {
  let response = await httpClient('auth-agents', 'POST', obj);
  return response;
};
export const userDetailFromLinkedin = async obj => {
  let response = await httpClient('linkedin-user-details', 'POST', obj);
  return response;
};
export const getSpeechToTextConfig = async () => {
  let response = await httpClient('speech-to-text-config', 'GET');
  return response;
};

export const getDemosLists = async () => {
  let response = await httpClient('skills', 'GET');
  return response;
};
export const getDemoById = async id => {
  let res = await httpClient(`skills/${id}`, 'GET');
  return res;
};

export const getWorkspaceStatus = async workspaceId => {
  let res = await httpClient(`skills/workspace/${workspaceId}/status`, 'GET');
  return res;
};

export const getCampaigns = async () => {
  let res = await httpClient(`campaigns`, 'GET');
  return res;
};

export const addCampaign = async campaign => {
  let res = await httpClient(`campaigns`, 'PUT', campaign);
  return res;
};

export const getCampaignById = async campaignId => {
  let res = await httpClient(`campaigns`, 'GET', { ID: campaignId });
  return res;
};

export const addDemo = async data => {
  try {
    let res = await httpClient(`skill`, 'PUT', data);
    return res;
  } catch (err) {
    return err;
  }
};

export const addDemoByJSON = async data => {
  try {
    let res = await httpClient(`skills`, 'POST', data);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteDemo = async id => {
  try {
    let res = await httpClient(`skills/${id}`, 'DELETE');
    return res;
  } catch (err) {
    return err;
  }
};

export const getUnassignedDemos = async () => {
  try {
    let res = await httpClient(`unassigned-skills`, 'GET');
    return res;
  } catch (err) {
    return err;
  }
};
export const checkIfLoadableInIFrame = async url => {
  try {
    let res = await httpClient(`is-loadable-in-ifram`, 'POST', { url });
    return res;
  } catch (err) {
    return err;
  }
};
