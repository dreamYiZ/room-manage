// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const getAllRooms = () => {
  // store.set('rooms',  )
  // const rooms = store.get('rooms');
  // return rooms || [];
};

const addRoom = (room: any) => {
  // const rooms = getAllRooms();
  // console.log('getAllRooms', room, rooms);

  window.electron.ipcRenderer.sendMessage('ipc-add-room', room);

  // store.set('rooms',  )
};

export default { addRoom, getAllRooms };
