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

const getAllTags = () => {
  return store.get('tags') || [];
};

const setAllTags = (tags: any) => {
  return store.set('tags', tags);
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
const ipcAddRoom = async (event: any, arg: any) => {
  addRoom(arg);
};

const ipcInit = (ipcMain: any) => {

  ipcMain.handle('ipc-add-room', ipcAddRoom);
  // ipcMain.handle('ipc-add-tag', ipcAddTag);
  // ipcMain.handle('ipc-delete-tag', ipcDeleteTag);
};

export default {
  ipcInit,
};
