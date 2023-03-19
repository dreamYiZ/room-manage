// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// 定义一个函数，用于获取所有房间的信息
const getAllRooms = () => {
  // 调用 Electron 的 ipcRenderer 模块，发送一个请求到主进程
  return window.electron.ipcRenderer.invoke('ipc-get-rooms');
};

// 定义一个函数，用于删除所有房间的信息
const deleteAllRooms = () => {
  // 调用 Electron 的 ipcRenderer 模块，发送一个消息到主进程
  return window.electron.ipcRenderer.sendMessage('ipc-delete-all-rooms');
};

// 定义一个函数，用于添加一个房间的信息
const addRoom = (room: any) => {
  // 调用 Electron 的 ipcRenderer 模块，发送一个请求到主进程，并传递 room 参数
  return window.electron.ipcRenderer.invoke('ipc-add-room', room);
};

// 定义一个函数，用于编辑一个房间的信息
const editRoom = (room: any) => {
  // 调用 Electron 的 ipcRenderer 模块，发送一个请求到主进程，并传递 room 参数
  return window.electron.ipcRenderer.invoke('ipc-edit-room', room);
};

// 定义一个函数，用于删除一个房间的信息
const deleteRoom = (room: any) => {
  // 调用 Electron 的 ipcRenderer 模块，发送一个消息到主进程，并传递 room 参数
  return window.electron.ipcRenderer.sendMessage('ipc-delete-room', room);
};

// 定义一个函数，用于获取所有标签的信息
const getTags = () => {
  // 调用 Electron 的 ipcRenderer 模块，发送一个请求到主进程
  return window.electron.ipcRenderer.invoke('ipc-get-tags');
};
// 定义一个函数，用于添加一个标签的信息
const addTag = (tag) => {
  // 调用 Electron 的 ipcRenderer 模块，发送一个请求到主进程，并传递 tag 参数
  return window.electron.ipcRenderer.invoke('ipc-add-tag', tag);
};
// 定义一个函数，用于删除一个标签的信息
const deleteTag = (tag) => {
  // 调用 Electron 的 ipcRenderer 模块，发送一个请求到主进程，并传递 tag 参数
  return window.electron.ipcRenderer.invoke('ipc-delete-tag', tag);
};

// 定义一个函数，用于预定（order）一间房间（room）
const orderRoom = (room: any) => {
  // 调用 Electron 的 ipcRenderer 模块，发送一条消息到主进程，并传递 room 参数
  return window.electron.ipcRenderer.sendMessage('ipc-order-room', room);
};
// 定义一下个函数（function），用户结账（checkout）一间房间（room）
const checkoutRoom = (room: any) => {
  // 调用 Electron 的 ipcRender 模块（module），发出一条消息（message）给主进程（main process），并且带上了参数（parameter）room
  return window.electron.ipcRenderer.sendMessage('ipc-checkout-room', room);
};

export default {
  addRoom,
  getAllRooms,
  deleteRoom,
  getTags,
  addTag,
  deleteTag,
  deleteAllRooms,
  editRoom,
  orderRoom,
  checkoutRoom,
};
