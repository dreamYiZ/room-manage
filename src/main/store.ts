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

type T_RESPONSE = {
  error: number;
  message: string;
};

const store = new Store();

const getAllRooms = () => {
  const rooms = store.get('rooms');
  return rooms || [];
};

const deleteAllRooms = () => {
  store.set('rooms', []);
};

const addRoom = (room: any): T_RESPONSE => {
  const rooms = getAllRooms();
  if (rooms.some((_room: any) => _room.sn === room.sn)) {
    return {
      error: 1,
      message: 'Room already exists',
    };
  }

  store.set('rooms', [...rooms, room]);
  return {
    error: 0,
    message: 'Room added successfully',
  };
};

const editRoom = (room: any) => {
  const rooms = getAllRooms().map((_room: any) => {
    if (_room.sn === room.sn) {
      return room;
    }
    return _room;
  });
  store.set('rooms', rooms);
};

const orderRoom = (room: any) => {
  const newRoom = { ...room, use: { name: 'somebody' } };
  editRoom(newRoom);
};
const checkoutRoom = (room: any) => {
  const newRoom = { ...room, use: null };
  editRoom(newRoom);
};

const deleteRoom = (room: any) => {
  const rooms = getAllRooms();
  store.set(
    'rooms',
    [...rooms].filter((_room) => {
      return _room.sn !== room.sn;
    })
  );
};

const getAllTags = () => {
  return store.get('tags') || [];
};

const setAllTags = (tags: any) => {
  return store.set('tags', [...new Set(tags)]);
};
const addTag = (tag: any) => {
  setAllTags([...getAllTags(), tag]);
};
const deleteTag = (tag: any) => {
  const newTags = getAllTags().filter((aTag: any) => aTag !== tag);
  setAllTags(newTags);
};

const ipcAddTag = async (event: any, arg: any) => {
  addTag(arg);
};
const ipcDeleteTag = async (event: any, arg: any) => {
  deleteTag(arg);
};
const ipcGetTags = async () => {
  return getAllTags();
};

const ipcAddRoom = async (event: any, arg: any) => {
  return addRoom(arg);
};
const ipcGetRooms = async () => {
  return getAllRooms();
};
const ipcDeleteAllRooms = async () => {
  deleteAllRooms();
};
const ipcDeleteRoom = async (event: any, arg: any) => {
  deleteRoom(arg);
};

const ipcEditRoom = async (event: any, arg: any) => {
  editRoom(arg);
};
const ipcOrderRoom = async (event: any, arg: any) => {
  orderRoom(arg);
};
const ipcCheckoutRoom = async (event: any, arg: any) => {
  checkoutRoom(arg);
};

const ipcInit = (ipcMain: any) => {
  ipcMain.on('ipc-order-room', ipcOrderRoom);
  ipcMain.on('ipc-checkout-room', ipcCheckoutRoom);
  ipcMain.on('ipc-delete-all-rooms', ipcDeleteAllRooms);
  ipcMain.on('ipc-delete-room', ipcDeleteRoom);
  ipcMain.handle('ipc-add-room', ipcAddRoom);
  ipcMain.handle('ipc-edit-room', ipcEditRoom);
  ipcMain.handle('ipc-get-rooms', ipcGetRooms);
  ipcMain.handle('ipc-add-tag', ipcAddTag);
  ipcMain.handle('ipc-delete-tag', ipcDeleteTag);
  ipcMain.handle('ipc-get-tags', ipcGetTags);
};

export default {
  ipcInit,
};
