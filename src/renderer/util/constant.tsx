export const ACTION_TYPES = {
  ADD_ROOM: '___ADD_ROOM_ACTION',
  DELETE_ROOM: '___DELETE_ROOM_ACTION',
} as const;

export type KEYS_ACTION_TYPES = keyof typeof ACTION_TYPES;
export type VALUES_ACTION_TYPES = (typeof ACTION_TYPES)[KEYS_ACTION_TYPES] | ''; //  "myValue1" | "myValue2"

export type SYSTEM_MENU_ITEM = {
  title: string;
  action: VALUES_ACTION_TYPES;
};

export const SYSTEM_MENU = [
  { title: '添加房间', action: ACTION_TYPES.ADD_ROOM },
  { title: '删除房间', action: ACTION_TYPES.DELETE_ROOM },
];

export const SYSTEM_INFO = {
  version: '0.1.0',
  info: '房间管理',
};
