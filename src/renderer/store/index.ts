// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const getAllRooms = () => {
  return window.electron.ipcRenderer.invoke('ipc-get-rooms');
};

const deleteAllRooms = () => {
  return window.electron.ipcRenderer.sendMessage('ipc-delete-all-rooms');
};

const addRoom = (room: any) => {
  return window.electron.ipcRenderer.invoke('ipc-add-room', room);
};

const deleteRoom = (room: any) => {
  return window.electron.ipcRenderer.sendMessage('ipc-delete-room', room);
};

const getTags = () => {
  return window.electron.ipcRenderer.invoke('ipc-get-tags');
};
const addTag = (tag) => {
  return window.electron.ipcRenderer.invoke('ipc-add-tag', tag);
};
const deleteTag = (tag) => {
  return window.electron.ipcRenderer.invoke('ipc-delete-tag', tag);
};

export default {
  addRoom,
  getAllRooms,
  deleteRoom,
  getTags,
  addTag,
  deleteTag,
  deleteAllRooms,
};
