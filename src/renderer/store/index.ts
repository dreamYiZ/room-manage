// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const getAllRooms = () => {
  // store.set('rooms',  )
  // const rooms = store.get('rooms');
  // return rooms || [];
};

const addRoom = (room: any) => {
  window.electron.ipcRenderer.ipcMessage('ipc-add-room', room);
};

const getTags = () => {};
const addTag = () => {};
const deleteTag = () => {};

export default { addRoom, getAllRooms, getTags, addTag, deleteTag };
