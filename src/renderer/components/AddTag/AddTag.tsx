import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import './AddTag.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import store from '../../store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddTag() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [openSnakeBar, setOpenSnakeBarOpen] = React.useState(false);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnakeBarOpen(false);
  };

  const handleClick = () => {};

  const addTag = () => {
    if (newTag) {
      store.addTag(newTag);
      setTags((preTags) => [...new Set([...preTags, newTag])]);
      setOpenSnakeBarOpen(true);
    }
  };

  const deleteTag = (tag: string) => {
    store.deleteTag(tag);
    setTags((preTags: string[]) =>
      preTags.filter((_tag: string) => _tag !== tag)
    );
  };

  const handleDelete = (tag: string) => {
    deleteTag(tag);
  };

  useEffect(() => {
    async function getTagsFromStore() {
      const gotTags = await store.getTags();
      // setData(json);
      setTags([...new Set([...gotTags])]);
    }
    getTagsFromStore();

    return () => {};
  }, []);

  return (
    <Box className="add-tag">
      <Box sx={{ m: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            id="outlined-basic"
            label="请输入标签"
            variant="outlined"
            value={newTag}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setNewTag(event.target.value);
            }}
          />
          <Button sx={{ ml: 1 }} variant="contained" onClick={addTag}>
            添加标签
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          {tags.map((tag) => (
            <Chip
              sx={{ mr: 1, mb: 1 }}
              key={`${tag}`}
              label={tag}
              onClick={handleClick}
              onDelete={() => handleDelete(tag)}
            />
          ))}
        </Box>
      </Box>

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
          添加标签成功！
        </Alert>
      </Snackbar>
    </Box>
  );
}
