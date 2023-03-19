import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Room from '../Room/Room';
import AddRoom, { T_Room } from '../AddRoom/AddRoom';
import store from '../../store';
import { CONFIG_TEXT, VALUES_ACTION_TYPES } from '../../util/constant';
import AlertDialog from '../AlertDialog/AlertDialog';

export default function DeleteRoom({
  action,
}: {
  action: VALUES_ACTION_TYPES;
}) {
  const [rooms, setRooms] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertDeleteContent, setAlertDeleteContent] = useState('');
  const [roomToDelete, setRoomToDelete] = useState<T_Room>();
  const [openEdit, setOpenEdit] = useState(false);

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
    setTimeout(resetDelete, 300);
  };

  const onClickEdit = (room: T_Room) => {
    setRoomToDelete(room);
    setOpenEdit(true);
  };

  const handleCloseEditRoom = () => {
    setOpenEdit(false);
    setTimeout(resetDelete, 300);
  };

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
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
            onClickEdit={() => onClickEdit(room)}
            action={action}
            key={room?.sn}
            room={room}
          />
        ))}
      </Box>

      <AlertDialog
        title={`删除此房间:${roomToDelete?.name}？`}
        open={openAlert}
        handleClose={cancelAlertDelete}
        handleOk={handleOkDelete}
        content={alertDeleteContent}
        okText={CONFIG_TEXT.OK_TEXT}
        cancelText={CONFIG_TEXT.CANCEL_TEXT}
      />

      <Box
        sx={{
          display: `${openEdit ? 'block' : 'none'}`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'primary.light',
        }}
      >
        <AddRoom
          editRoom={roomToDelete}
          action={action}
          handleCloseEditRoom={handleCloseEditRoom}
        />
      </Box>
    </Box>
  );
}
