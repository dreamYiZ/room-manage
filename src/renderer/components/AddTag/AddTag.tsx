import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import './AddTag.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddTag() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const addTag = () => {};

  const deleteTag = () => {};

  return (
    <Box className="add-tag">
      <Box sx={{ m: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            id="outlined-basic"
            label="请输入标签"
            variant="outlined"
          />
          <Button sx={{ ml: 1 }} variant="contained">
            添加标签
          </Button>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip
            label="Clickable Deletable"
            onClick={handleClick}
            onDelete={handleDelete}
          />
        </Stack>
      </Box>
    </Box>
  );
}
