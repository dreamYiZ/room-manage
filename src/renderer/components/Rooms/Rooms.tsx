import { useEffect, useState } from 'react';
import './Rooms.scss';
import {
  ACTION_TYPES,
  CONFIG_TEXT,
  VALUES_ACTION_TYPES,
} from 'renderer/util/constant';
import store from 'renderer/store';
import Box from '@mui/material/Box';
import { AlertColor } from '@mui/material/Alert';
import { T_Room } from '../AddRoom/AddRoom';
import Room from '../Room/Room';
import AlertDialog from '../AlertDialog/AlertDialog';
import BaseSnakeBar from '../SnakeBar/BaseSnakeBar';

function Rooms({ show, menuActive }: { show: boolean; menuActive: number }) {
  const [action, setAction] = useState<VALUES_ACTION_TYPES>(
    ACTION_TYPES.ORDER_ROOM
  );
  const [rooms, setRooms] = useState([]);

  const [roomToOperate, setRoomToOperate] = useState<T_Room>();
  const [openAlert, setOpenAlert] = useState(false);
  const [openSnakeBar, setOpenSnakeBar] = useState(false);
  const [textSnakeBar, setTextSnakeBar] = useState<string>('');
  // eslint-disable-next-line no-unused-vars
  const [severitySnakeBar, setSeveritySnakeBar] =
    useState<AlertColor>('success');

  useEffect(() => {
    if (menuActive === 0) {
      setAction(ACTION_TYPES.ORDER_ROOM);
    }
    if (menuActive === 1) {
      setAction(ACTION_TYPES.CHECKOUT_ROOM);
    }

    return () => {};
  }, [menuActive]);

  useEffect(() => {
    async function getRoomsFromStore() {
      const gotRooms: [] = (await store.getAllRooms()) || [];
      // setData(json);
      setRooms([...new Set(gotRooms)]);
    }
    if (menuActive < 2) {
      getRoomsFromStore();
    }
    return () => {};
  }, [menuActive]);

  const reloadRooms = () => {
    setTimeout(() => {
      async function getRoomsFromStore() {
        const gotRooms: [] = (await store.getAllRooms()) || [];
        // setData(json);
        setRooms([...new Set(gotRooms)]);
      }
      if (menuActive < 2) {
        getRoomsFromStore();
      }
    }, 300);
  };
  const onClickOrderRoom = (room: T_Room) => {
    setRoomToOperate(room);
    setOpenAlert(true);
  };
  const onClickCheckoutRoom = (room: T_Room) => {
    setRoomToOperate(room);
    setOpenAlert(true);
  };

  const resetOperateState = () => {
    setOpenAlert(false);
  };

  const handleCancelAlert = () => {
    resetOperateState();
  };

  // This function handles the alert confirmation based on the action type
  const handleOkAlert = () => {
    // If the action type is order room, order the room, show a snackbar
    // message, reload the rooms, and reset the state
    if (action === ACTION_TYPES.ORDER_ROOM) {
      store.orderRoom(roomToOperate);
      setTextSnakeBar('预定房间');
      setOpenSnakeBar(true);
      reloadRooms();
      resetOperateState();
    }

    // If the action type is checkout room, checkout the room,
    // show a snackbar message, reload the rooms, and reset the state
    if (action === ACTION_TYPES.CHECKOUT_ROOM) {
      store.checkoutRoom(roomToOperate);
      setTextSnakeBar('退房');
      setOpenSnakeBar(true);
      reloadRooms();
      resetOperateState();
    }
  };

  // This function returns the alert title based on the action type
  const getAlertTitle = () => {
    // If the action type is order room, return the room number and name
    if (action === ACTION_TYPES.ORDER_ROOM) {
      return `预定房间:${roomToOperate?.sn},${roomToOperate?.name}`;
    }
    // If the action type is checkout room, return the room number and name
    if (action === ACTION_TYPES.CHECKOUT_ROOM) {
      return `退房房间:${roomToOperate?.sn},${roomToOperate?.name}`;
    }
    // Otherwise, return an empty string
    return '';
  };

  // This function returns the alert content based on the action type
  const getAlertContent = () => {
    // If the action type is order room or checkout room, return the room long name and tag
    if (
      action === ACTION_TYPES.ORDER_ROOM ||
      action === ACTION_TYPES.CHECKOUT_ROOM
    ) {
      return `${roomToOperate?.longName},${roomToOperate?.tag}`;
    }
    // Otherwise, return an empty string
    return '';
  };

  //   你想让我优化这段代码吗？我可以尝试这样做，但是我不能保证我的优化是最佳的。你可以使用一些 JavaScript 的性能优化技巧，比如：
  // - 使用不可变的数据结构¹
  // - 使用箭头函数代替普通函数²
  // - 使用 === 代替 == 进行严格比较³
  // - 使用 switch 语句代替多个 if 语句⁴

  // 下面是我给你的代码添加一些简单的优化：

  // 定义一个函数，用于根据 action 状态过滤和排序房间信息
  // const getFilteredRoomsChatGpt = () => {
  //   // 使用 switch 语句代替多个 if 语句
  //   switch (action) {
  //     case ACTION_TYPES.CHECKOUT_ROOM:
  //       // 返回已使用的房间，并按照 sortNumber 升序排序
  //       return rooms
  //         .filter((room: T_Room) => room.use) // 使用箭头函数和隐式返回
  //         .sort((a: T_Room, b: T_Room) => a.sortNumber - b.sortNumber);
  //     case ACTION_TYPES.ORDER_ROOM:
  //       // 返回未使用的房间，并按照 sortNumber 升序排序
  //       return rooms
  //         .filter((room: T_Room) => !room.use) // 使用箭头函数和隐式返回
  //         .sort((a: T_Room, b: T_Room) => a.sortNumber - b.sortNumber);
  //     default:
  //       // 返回所有房间，并按照 sortNumber 升序排序
  //       return rooms.sort(
  //         (a: T_Room, b: T_Room) => a.sortNumber - b.sortNumber
  //       );
  //   }
  // };

  // 定义一个函数，用于根据 action 状态过滤和排序房间信息
  /**
   * @param {T_Room[]} rooms - 房间信息数组
   * @param {VALUES_ACTION_TYPES} action - 操作类型（预定或结账）
   * @returns {T_Room[]} - 过滤和排序后的房间信息数组
   */
  const getFilteredRooms = () => {
    // 使用 filter 方法根据 action 状态过滤房间信息
    return (
      rooms
        .filter((_room: T_Room) => {
          // 如果操作类型是结账，只返回已使用的房间
          if (action === ACTION_TYPES.CHECKOUT_ROOM) {
            if (_room.use) {
              return true;
            }
            return false;
          }

          // 如果操作类型是预定，只返回未使用的房间
          if (action === ACTION_TYPES.ORDER_ROOM) {
            if (_room.use) {
              return false;
            }
            return true;
          }
          // 否则返回所有房间
          return true;
        })
        // 使用 sort 方法根据 sortNumber 属性升序排序房间信息
        .sort((a: T_Room, b: T_Room) => a.sortNumber - b.sortNumber)
    );
  };

  return (
    <div style={{ display: `${show ? 'block' : 'none'}` }} className="rooms">
      <Box
        mb={2}
        // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        height="80vh" // fixed the height
        style={{
          border: '2px solid black',
          display: 'flex',
          flexWrap: 'wrap',
          overflow: 'hidden',
          overflowY: 'scroll', // added scroll
        }}
      >
        {getFilteredRooms().map((room: T_Room) => (
          <Room
            action={action}
            key={room?.sn}
            room={room}
            onClickOrderRoom={() => onClickOrderRoom(room)}
            onClickCheckoutRoom={() => onClickCheckoutRoom(room)}
          />
        ))}
      </Box>

      <AlertDialog
        title={getAlertTitle()}
        open={openAlert}
        handleClose={handleCancelAlert}
        handleOk={handleOkAlert}
        content={getAlertContent()}
        okText={CONFIG_TEXT.OK_TEXT}
        cancelText={CONFIG_TEXT.CANCEL_TEXT}
      />
      <BaseSnakeBar
        openSnakeBar={openSnakeBar}
        setOpenSnakeBarOpen={setOpenSnakeBar}
        severity={severitySnakeBar}
      >
        {textSnakeBar}
      </BaseSnakeBar>
    </div>
  );
}

export default Rooms;
