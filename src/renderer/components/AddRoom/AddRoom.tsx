import React, { useState } from 'react';
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
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import store from '../../store';

type Room = {
  sn: string;
  name: string;
  longName: string;
  price: number;
  sortNumber: number;
  tag: string;
};

const defaultRoom: Room = {
  sn: '',
  name: '',
  longName: '',
  price: 0,
  sortNumber: 0,
  tag: '新增房间',
};

export default function AddRoom() {
  const [tags, setTags] = React.useState({});

  const [room, setRoom] = useState<Room>(defaultRoom);

  const onClickAddRoom = () => {
    console.log('onClickAddRoom');
    // console.log(store.set('foo', 'foo bar'));
    store.addRoom(room);
  };

  // const doFormatRoom = () => {
  // const newRoom: Room = { ...room };
  // newRoom.price = parseInt(newRoom.price.toString(), 10);
  // newRoom.sortNumber = parseInt(newRoom.sortNumber.toString(), 10);
  // setRoom(newRoom);
  // };

  const onBlur = () => {
    // doFormatRoom();
  };
  return (
    <div className="add-room">
      <FormControl sx={{ m: 1, width: '300px' }}>
        <TextField
          label="房间编号"
          variant="outlined"
          value={room.sn}
          onBlur={onBlur}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setRoom((preRoom: Room) => ({
              ...preRoom,
              sn: event.target.value ? event.target.value : '',
            }));
          }}
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: '300px' }}>
        <TextField
          label="房间简称"
          variant="outlined"
          onBlur={onBlur}
          value={room.name}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setRoom((preRoom: Room) => ({
              ...preRoom,
              name: event.target.value ? event.target.value : '',
            }));
          }}
        />
      </FormControl>

      <FormControl sx={{ m: 1 }} fullWidth>
        <TextField
          label="房间名称"
          variant="outlined"
          onBlur={onBlur}
          value={room.longName}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setRoom((preRoom: Room) => ({
              ...preRoom,
              longName: event.target.value ? event.target.value : '',
            }));
          }}
        />
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel size="normal" htmlFor="filled-adornment-amount">
          房间价格
        </InputLabel>
        <FilledInput
          value={room.price}
          onBlur={onBlur}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setRoom((preRoom: Room) => ({
              ...preRoom,
              price: event.target.value ? parseInt(event.target.value, 10) : 0,
            }));
          }}
          type="number"
          startAdornment={<InputAdornment position="start">¥</InputAdornment>}
        />
      </FormControl>

      <FormControl sx={{ display: 'block', m: 1 }}>
        <InputLabel id="demo-simple-select-label">标签</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={room.tag}
          onBlur={onBlur}
          onChange={(event: SelectChangeEvent<string>) => {
            setRoom((preRoom: Room) => ({
              ...preRoom,
              tag: event.target.value ? event.target.value : '',
            }));
          }}
          label="标签"
          sx={{ width: '280px' }}
        >
          <MenuItem value="Ten">Ten</MenuItem>
          <MenuItem value="Twenty">Twenty</MenuItem>
          <MenuItem value="Thirty">Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="filled">
        <InputLabel size="normal" htmlFor="filled-adornment-amount">
          房间排序号
        </InputLabel>
        <FilledInput
          type="number"
          value={room.sortNumber}
          onBlur={onBlur}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setRoom((preRoom: Room) => ({
              ...preRoom,
              sortNumber: event.target.value
                ? parseInt(event.target.value, 10)
                : 0,
            }));
          }}
          startAdornment={
            <InputAdornment position="start">
              <SortByAlphaIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      <Divider light />
      <FormControl sx={{ m: 1 }}>
        <Button
          onClick={onClickAddRoom}
          variant="contained"
          endIcon={<AddIcon />}
        >
          添加房间
        </Button>
      </FormControl>
    </div>
  );
}
