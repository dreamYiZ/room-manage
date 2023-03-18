import { useEffect, useState } from 'react';
import './Rooms.scss';
import { ACTION_TYPES, VALUES_ACTION_TYPES } from 'renderer/util/constant';
import store from 'renderer/store';
import Box from '@mui/material/Box';
import { T_Room } from '../AddRoom/AddRoom';
import Room from '../Room/Room';

function Rooms({ show, menuActive }: { show: boolean; menuActive: number }) {
  const [action, setAction] = useState<VALUES_ACTION_TYPES>(
    ACTION_TYPES.ORDER_ROOM
  );
  const [rooms, setRooms] = useState([]);

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
        {rooms.map((room: T_Room) => (
          <Room action={action} key={room?.sn} room={room} />
        ))}
      </Box>
    </div>
  );
}

export default Rooms;
