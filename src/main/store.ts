/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */

const Store = require('electron-store');

const store = new Store();

const getAllRooms = () => {
  // store.set('rooms',  )
  const rooms = store.get('rooms');
  return rooms || [];
};

const addRoom = (room: any) => {
  const rooms = getAllRooms();
  console.log('getAllRooms', room, rooms);

  store.set('rooms', [...rooms, room]);
};

const ipcAddRoom = async (event: any, arg: any) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  // console.log('event', event);
  // console.log('arg', arg);
  addRoom(arg);
  // event.reply('ipc-example', msgTemplate('pong'));
};

const ipcInit = (ipcMain: any) => {
  ipcMain.on('ipc-add-room', ipcAddRoom);
};

export default {
  ipcInit,
};
