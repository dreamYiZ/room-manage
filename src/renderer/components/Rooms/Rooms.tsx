import { useEffect, useState } from 'react';
import './Rooms.scss';
import { ACTION_TYPES, VALUES_ACTION_TYPES } from 'renderer/util/constant';
import store from 'renderer/store';
import Box from '@mui/material/Box';
import { T_Room } from '../AddRoom/AddRoom';
import Room from '../Room/Room';
import AlertDialog from '../AlertDialog/AlertDialog';
import BaseSnakeBar from '../SnakeBar/BaseSnakeBar';
import { AlertColor } from '@mui/material/Alert';

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
  const handleOkAlert = () => {
    if (action === ACTION_TYPES.ORDER_ROOM) {
      store.orderRoom(roomToOperate);
      setTextSnakeBar('预定房间');
      setOpenSnakeBar(true);
      reloadRooms();
      resetOperateState();
    }

    if (action === ACTION_TYPES.CHECKOUT_ROOM) {
      store.checkoutRoom(roomToOperate);
      setTextSnakeBar('退房');
      setOpenSnakeBar(true);
      reloadRooms();
      resetOperateState();
    }
  };

  const getAlertTitle = () => {
    if (action === ACTION_TYPES.ORDER_ROOM) {
      return `预定房间:${roomToOperate?.sn},${roomToOperate?.name}`;
    }
    if (action === ACTION_TYPES.CHECKOUT_ROOM) {
      return `退房房间:${roomToOperate?.sn},${roomToOperate?.name}`;
    }
    return '';
  };
  const getAlertContent = () => {
    if (action === ACTION_TYPES.ORDER_ROOM) {
      return `${roomToOperate?.longName},${roomToOperate?.tag}`;
    }
    if (action === ACTION_TYPES.CHECKOUT_ROOM) {
      return `${roomToOperate?.longName},${roomToOperate?.tag}`;
    }
    return '';
  };

  const getFilteredRoms = () => {
    return rooms
      .filter((_room: T_Room) => {
        if (action === ACTION_TYPES.CHECKOUT_ROOM) {
          if (_room.use) {
            return true;
          }
          return false;
        }

        if (action === ACTION_TYPES.ORDER_ROOM) {
          if (_room.use) {
            return false;
          }
          return true;
        }
        return true;
      })
      .sort((a: T_Room, b: T_Room) => a.sortNumber - b.sortNumber);
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
        {getFilteredRoms().map((room: T_Room) => (
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
        okText="确定"
        cancelText="取消"
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
