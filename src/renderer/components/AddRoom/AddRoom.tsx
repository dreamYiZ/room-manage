import React from 'react';
import './AddRoom.scss';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function AddRoom() {
  const [tag, setTag] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTag(event.target.value as string);
  };

  return (
    <div className="add-room">
      <FormControl sx={{ m: 1, width: '300px' }}>
        <TextField label="房间编号" variant="outlined" />
      </FormControl>

      <FormControl sx={{ m: 1, width: '300px' }}>
        <TextField label="房间简称" variant="outlined" />
      </FormControl>

      <FormControl sx={{ m: 1 }} fullWidth>
        <TextField label="房间名称" variant="outlined" />
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel size="normal" htmlFor="filled-adornment-amount">
          房间价格
        </InputLabel>
        <FilledInput
          type="number"
          startAdornment={<InputAdornment position="start">¥</InputAdornment>}
        />
      </FormControl>

      <FormControl sx={{ display: 'block', m: 1 }}>
        <InputLabel id="demo-simple-select-label">标签</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tag}
          label="标签"
          sx={{ width: '280px' }}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <Divider light />
      <FormControl sx={{ m: 1 }}>
        <Button variant="contained" endIcon={<AddIcon />}>
          添加房间
        </Button>
      </FormControl>
    </div>
  );
}
