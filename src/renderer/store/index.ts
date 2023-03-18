// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const getAllRooms = () => {
  // store.set('rooms',  )
  // const rooms = store.get('rooms');
  // return rooms || [];
};

const addRoom = (room: any) => {
  return window.electron.ipcRenderer.invoke('ipc-add-room', room);
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

export default { addRoom, getAllRooms, getTags, addTag, deleteTag };
