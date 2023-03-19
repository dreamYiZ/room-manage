export const ACTION_TYPES = {
  ADD_ROOM: '___ADD_ROOM_ACTION',
  EDIT_ROOM: '___EDIT_ROOM_ACTION',
  DELETE_ROOM: '___DELETE_ROOM_ACTION',
  ADD_TAG: '___ADD_TAG_ACTION',
  ORDER_ROOM: '___ORDER_ROOM_ACTION',
  CHECKOUT_ROOM: '___CHECKOUT_ROOM_ACTION',
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

export const CONFIG_TEXT = {
  ROOM: '房间',
  ORDER_ROOM: '订房',
  CHECKOUT_ROOM: '退房',
  SYSTEM: '系统',
  OK_TEXT: '确定',
  CANCEL_TEXT: '取消',
  ADD_ROOM_ACTION_ADD: '添加',
  ADD_ROOM_ACTION_EDIT: '编辑',
  ADD_ROOM_ACTION_BACK: '返回',
  ADD_ROOM_ACTION_LABEL_SN: '房间编号',
  ADD_ROOM_ACTION_LABEL_NAME: '房间简称',
  ADD_ROOM_ACTION_LABEL_LONG_NAME: '房间名称',
  ADD_ROOM_ACTION_LABEL_PRICE: '房间价格',
  ADD_ROOM_ACTION_LABEL_TAG: '标签',
  ADD_ROOM_ACTION_LABEL_SORT_NUMBER: '房间排序号',
  ADD_ROOM_HELP_TEXT_SN: '请输入房间编号',
  ADD_ROOM_HELP_TEXT_NAME: '请输入房间简称',
  ADD_ROOM_HELP_TEXT_LONG_NAME: '请输入房间名称',
  ADD_ROOM_HELP_TEXT_PRICE: '请输入房间价格',
  ADD_ROOM_HELP_TEXT_TAG: '请选择房间标签',
  ADD_ROOM_HELP_TEXT_SORT_NUMBER: '请输入房间排序号',
  ADD_TAG_INPUT_PLACEHOLDER: '请输入标签',
  ADD_TAG_BUTTON: '添加标签',
  ADD_TAG_SNAKE_BAR_TEXT: '添加标签成功！',
  SYSTEM_BUTTON_DELETE_ALL_ROOMS: '删除所有房间',
};
