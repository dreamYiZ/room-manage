import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line camelcase
import { T_Room } from '../AddRoom/AddRoom';
import { VALUES_ACTION_TYPES, ACTION_TYPES } from '../../util/constant';

export default function Room({
  room,
  action,
  onClickDelete,
}: {
  room: T_Room;
  action: VALUES_ACTION_TYPES;
  onClickDelete?: () => void;
}) {
  return (
    <Card sx={{ width: 160, m: 1, height: 220 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {room?.sn}
        </Typography>
        <Typography variant="h5" component="div">
          {room?.name}
        </Typography>
        <Typography sx={{}} color="text.secondary">
          {room?.price}
        </Typography>
        <Typography variant="body2">
          {room?.longName}
          <br />
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {room?.tag}
        </Typography>
      </CardContent>
      <CardActions>
        {action === ACTION_TYPES.ORDER_ROOM && (
          <Button size="small">预定</Button>
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

Room.defaultProps = { onClickDelete: () => {} };
