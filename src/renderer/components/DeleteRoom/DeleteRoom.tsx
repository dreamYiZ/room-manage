import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Room from '../Room/Room';
import { T_Room } from '../AddRoom/AddRoom';
import store from '../../store';
import { ACTION_TYPES } from '../../util/constant';
import AlertDialog from '../AlertDialog/AlertDialog';

export default function DeleteRoom() {
  const [rooms, setRooms] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDeleteContent, setAlertDeleteContent] = useState('');
  const [roomToDelete, setRoomToDelete] = useState<T_Room>();

  useEffect(() => {
    async function getRoomsFromStore() {
      const gotRooms: [] = (await store.getAllRooms()) || [];
      // setData(json);
      setRooms([...new Set(gotRooms)]);
    }
    getRoomsFromStore();
    return () => {};
  }, []);

  const resetDelete = async () => {
    setAlertDeleteContent('');
    setOpenAlert(false);
    const gotRooms: [] = (await store.getAllRooms()) || [];
    setRooms([...new Set(gotRooms)]);
  };

  const cancelAlertDelete = () => {
    setOpenAlert(false);
    setAlertDeleteContent('');
  };

  const onClickDelete = (room: T_Room) => {
    setRoomToDelete(room);
    setAlertDeleteContent(
      `确认删除房间${room.sn}---${room.name}---${room.price}---${room.longName}---${room.tag}`
    );
    setOpenAlert(true);
  };

  const handleOkDelete = () => {
    store.deleteRoom(roomToDelete);
    resetDelete();
  };
  return (
    <Box sx={{ m: 1 }}>
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
        {rooms.map((room: T_Room) => (
          <Room
            onClickDelete={() => onClickDelete(room)}
            action={ACTION_TYPES.DELETE_ROOM}
            key={room?.sn}
            room={room}
          />
        ))}
      </Box>

      <AlertDialog
        title="删除此房间？"
        open={openAlert}
        handleClose={cancelAlertDelete}
        handleOk={handleOkDelete}
        content={alertDeleteContent}
        okText="确定"
        cancelText="取消"
      />
    </Box>
  );
}
