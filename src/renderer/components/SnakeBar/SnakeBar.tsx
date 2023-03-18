import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnakeBar({
  children,
  openSnakeBar,
  setOpenSnakeBarOpen,
}: {
  children: React.ReactNode;
  openSnakeBar: boolean;
  setOpenSnakeBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [openSnakeBar, setOpenSnakeBarOpen] = React.useState(false);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnakeBarOpen(false);
  };
  return (
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
        {children}
      </Alert>
    </Snackbar>
  );
}
