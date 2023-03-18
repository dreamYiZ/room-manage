import React, { useEffect, useState } from 'react';
import './AddRoom.scss';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import BaseSnakeBar from '../SnakeBar/BaseSnakeBar';
import store from '../../store';
import { ACTION_TYPES, VALUES_ACTION_TYPES } from '../../util/constant';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type T_Room = {
  sn: string;
  name: string;
  longName: string;
  price: number;
  sortNumber: number;
  tag: string;
};

const defaultRoom: T_Room = {
  sn: '',
  name: '',
  longName: '',
  price: 0,
  sortNumber: 0,
  tag: '',
};

export default function AddRoom({
  action,
  editRoom,
  handleCloseEditRoom,
}: {
  action?: VALUES_ACTION_TYPES;
  editRoom?: T_Room;
  handleCloseEditRoom?: () => void;
}) {
  const defaultValidateRoom = {
    sn: {
      helperText: '',
      error: false,
    },
    name: { helperText: '', error: false },
    longName: { helperText: '', error: false },
    price: { helperText: '', error: false },
    sortNumber: { helperText: '', error: false },
    tag: { helperText: '', error: false },
  };

  const [tags, setTags] = React.useState([]);
  const [openSnakeBar, setOpenSnakeBarOpen] = React.useState(false);
  const [room, setRoom] = useState<T_Room>(defaultRoom);
  const [validateRoom, setValidateRoom] = useState(defaultValidateRoom);

  const [openSnakeBarError, setOpenSnakeBarError] = useState(false);
  const [textSnakeBarError, setTextSnakeBarError] = useState('');

  let actionText = '添加';
  let actionButtonIcon = <AddIcon />;
  if (action === ACTION_TYPES.EDIT_ROOM) {
    actionText = '编辑';
    actionButtonIcon = <DoneOutlineRoundedIcon />;
  }

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnakeBarOpen(false);
  };

  const onClickAddRoom = async () => {
    // console.log('onClickAddRoom');
    // console.log(store.set('foo', 'foo bar'));
    let errorRoom = false;
    setValidateRoom(defaultValidateRoom);

    if (!room.sn) {
      setValidateRoom((preErr) => ({
        ...preErr,
        sn: {
          error: true,
          helperText: '请输入房间编号',
        },
      }));
      errorRoom = true;
    }
    if (!room.name) {
      setValidateRoom((preErr) => ({
        ...preErr,
        name: {
          error: true,
          helperText: '请输入房间简称',
        },
      }));
      errorRoom = true;
    }
    if (!room.longName) {
      setValidateRoom((preErr) => ({
        ...preErr,
        longName: {
          error: true,
          helperText: '请输入房间名称',
        },
      }));
      errorRoom = true;
    }
    if (!room.price) {
      setValidateRoom((preErr) => ({
        ...preErr,
        price: {
          error: true,
          helperText: '请输入房间价格',
        },
      }));
      errorRoom = true;
    }
    if (!room.tag) {
      setValidateRoom((preErr) => ({
        ...preErr,
        tag: {
          error: true,
          helperText: '请选择房间标签',
        },
      }));
      errorRoom = true;
    }
    if (!room.sortNumber) {
      setValidateRoom((preErr) => ({
        ...preErr,
        sortNumber: {
          error: true,
          helperText: '请输入房间排序号',
        },
      }));
      errorRoom = true;
    }

    if (errorRoom) {
      return;
    }

    if (action === ACTION_TYPES.EDIT_ROOM) {
      const error = await store.editRoom(room);

      if (error) {
        return;
      }
      if (handleCloseEditRoom) {
        handleCloseEditRoom();
      }
    }

    if (!action || action === ACTION_TYPES.ADD_ROOM) {
      const result = await store.addRoom(room);
      // console.log('result', result);
      if (result.error) {
        setTextSnakeBarError(result.message || '已存在');
        setOpenSnakeBarError(true);
        // console.log('error', error);
      } else {
        setOpenSnakeBarOpen(true);
      }
    }
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

  useEffect(() => {
    async function getTagsFromStore() {
      const gotTags: [] = (await store.getTags()) || [];
      // setData(json);
      setTags([...new Set(gotTags)]);
    }
    getTagsFromStore();

    return () => {};
  }, []);

  useEffect(() => {
    if (action === ACTION_TYPES.EDIT_ROOM) {
      if (editRoom) {
        // console.log('editRoom', editRoom);
        setRoom(editRoom);
      }
    }
  }, [action, editRoom]);

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
            setRoom((preRoom: T_Room) => ({
              ...preRoom,
              sn: event.target.value ? event.target.value : '',
            }));
          }}
          error={validateRoom.sn.error}
          helperText={validateRoom.sn.helperText}
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
            setRoom((preRoom: T_Room) => ({
              ...preRoom,
              name: event.target.value ? event.target.value : '',
            }));
          }}
          error={validateRoom.name.error}
          helperText={validateRoom.name.helperText}
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
            setRoom((preRoom: T_Room) => ({
              ...preRoom,
              longName: event.target.value ? event.target.value : '',
            }));
          }}
          error={validateRoom.longName.error}
          helperText={validateRoom.longName.helperText}
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
            setRoom((preRoom: T_Room) => ({
              ...preRoom,
              price: event.target.value ? parseInt(event.target.value, 10) : 0,
            }));
          }}
          error={validateRoom.price.error}
          // helperText={validateRoom.price.helperText}
          type="number"
          startAdornment={<InputAdornment position="start">¥</InputAdornment>}
        />
      </FormControl>

      <FormControl sx={{ display: 'block', m: 1 }}>
        {/* <InputLabel id="demo-simple-select-label">标签</InputLabel> */}
        <TextField
          select
          id="demo-simple-select"
          value={room.tag}
          onBlur={onBlur}
          onChange={(
            event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => {
            setRoom((preRoom: T_Room) => ({
              ...preRoom,
              tag: event.target.value ? event.target.value : '',
            }));
          }}
          label="标签"
          sx={{ width: '280px' }}
          error={validateRoom.tag.error}
          helperText={validateRoom.tag.helperText}
        >
          {tags.map((tag) => {
            return (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            );
          })}
        </TextField>
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
            setRoom((preRoom: T_Room) => ({
              ...preRoom,
              sortNumber: event.target.value
                ? parseInt(event.target.value, 10)
                : 0,
            }));
          }}
          error={validateRoom.sortNumber.error}
          // helperText={validateRoom.sortNumber.helperText}
          startAdornment={
            <InputAdornment position="start">
              <SortByAlphaIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      <Divider light />
      <FormControl sx={{ m: 1, flexDirection: 'row' }}>
        <Button
          onClick={onClickAddRoom}
          variant="contained"
          startIcon={actionButtonIcon}
        >
          {actionText}房间
        </Button>

        {action === ACTION_TYPES.EDIT_ROOM && (
          <Button
            sx={{
              ml: 1,
              backgroundColor: 'info.dark',
            }}
            onClick={handleCloseEditRoom}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            返回
          </Button>
        )}
      </FormControl>

      <Snackbar
        open={openSnakeBar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {actionText}房间成功！
        </Alert>
      </Snackbar>
      <BaseSnakeBar
        openSnakeBar={openSnakeBarError}
        setOpenSnakeBarOpen={setOpenSnakeBarError}
        severity="error"
      >
        {textSnakeBarError}
      </BaseSnakeBar>
    </div>
  );
}

AddRoom.defaultProps = {
  action: '',
  editRoom: defaultRoom,
  handleCloseEditRoom: () => {},
};
