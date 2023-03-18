import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import store from '../../store';

export default function SystemSettings() {
  const deleteAllRooms = () => {
    store.deleteAllRooms();
  };
  return (
    <Box sx={{ m: 1 }}>
      <Button color="secondary" variant="contained" onClick={deleteAllRooms}>
        删除所有房间
      </Button>
    </Box>
  );
}
