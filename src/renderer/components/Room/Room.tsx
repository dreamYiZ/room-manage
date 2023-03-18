import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CurrencyYuanIcon from '@mui/icons-material/CurrencyYuan';
import { red } from '@mui/material/colors';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
// eslint-disable-next-line camelcase
import { T_Room } from '../AddRoom/AddRoom';
import { VALUES_ACTION_TYPES, ACTION_TYPES } from '../../util/constant';

export default function Room({
  room,
  action,
  onClickDelete,
  onClickEdit,
}: {
  room: T_Room;
  action: VALUES_ACTION_TYPES;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
}) {
  return (
    <Card sx={{ width: 160, m: 1, height: 260 }}>
      <CardContent sx={{ pb: 0.5 }}>
        <Typography
          sx={{ fontSize: 14, mb: 0 }}
          color="text.secondary"
          gutterBottom
        >
          {room?.sn}
        </Typography>
        <Typography variant="h5" component="div">
          {room?.name}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <CurrencyYuanIcon />

          <Typography
            color="text.secondary"
            variant="h6"
            sx={{ color: red[700], mb: 0 }}
            gutterBottom
          >
            {room?.price}
          </Typography>
        </Box>
        <Typography variant="body2">
          {room?.longName}
          <br />
        </Typography>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ mb: 0 }}
        >
          {room?.tag}
        </Typography>
        {action === ACTION_TYPES.EDIT_ROOM && (
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ mb: 0 }}
          >
            排序：{room?.sortNumber}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {action === ACTION_TYPES.ORDER_ROOM && (
          <Button size="small" variant="outlined">
            预定
          </Button>
        )}

        {action === ACTION_TYPES.EDIT_ROOM && (
          <Button
            onClick={onClickEdit}
            size="small"
            variant="outlined"
            startIcon={<BorderColorRoundedIcon />}
          >
            编辑
          </Button>
        )}

        {action === ACTION_TYPES.DELETE_ROOM && (
          <Button
            onClick={onClickDelete}
            size="small"
            variant="outlined"
            color="error"
          >
            删除
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

Room.defaultProps = {
  onClickDelete: () => {},
  onClickEdit: () => {},
};
