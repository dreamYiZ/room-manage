export const ACTION_TYPES = {
  ADD_ROOM: '___ADD_ROOM_ACTION',
  EDIT_ROOM: '___EDIT_ROOM_ACTION',
  DELETE_ROOM: '___DELETE_ROOM_ACTION',
  ADD_TAG: '___ADD_TAG_ACTION',
  ORDER_ROOM: '___ORDER_ROOM_ACTION',
  SYSTEM_SETTINGS: '___SYSTEM_SETTINGS_ACTION',
  EDIT: '___EDIT_ACTION',
  DELETE: '___DELETE_ACTION',
} as const;

export type KEYS_ACTION_TYPES = keyof typeof ACTION_TYPES;
export type VALUES_ACTION_TYPES = (typeof ACTION_TYPES)[KEYS_ACTION_TYPES] | ''; //  "myValue1" | "myValue2"

export type SYSTEM_MENU_ITEM = {
  title: string;
  action: VALUES_ACTION_TYPES;
};

export const SYSTEM_MENU = [
  { title: '添加房间', action: ACTION_TYPES.ADD_ROOM },
  { title: '编辑房间', action: ACTION_TYPES.EDIT_ROOM },
  { title: '删除房间', action: ACTION_TYPES.DELETE_ROOM },
  { title: '添加标签', action: ACTION_TYPES.ADD_TAG },
  { title: '系统设置', action: ACTION_TYPES.SYSTEM_SETTINGS },
];

export const SYSTEM_INFO = {
  version: '0.1.0',
  info: '房间管理',
};
