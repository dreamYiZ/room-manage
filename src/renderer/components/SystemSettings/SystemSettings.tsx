import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CONFIG_TEXT } from 'renderer/util/constant';
import store from '../../store';

export default function SystemSettings() {
  const deleteAllRooms = () => {
    store.deleteAllRooms();
  };
  return (
    <Box sx={{ m: 1 }}>
      <Button color="secondary" variant="contained" onClick={deleteAllRooms}>
        {CONFIG_TEXT.SYSTEM_BUTTON_DELETE_ALL_ROOMS}
      </Button>
    </Box>
  );
}
