import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import './AddTag.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { CONFIG_TEXT } from 'renderer/util/constant';
import store from '../../store';
import BaseSnakeBar from '../SnakeBar/BaseSnakeBar';

export default function AddTag() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [openSnakeBar, setOpenSnakeBarOpen] = React.useState(false);

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
            label={CONFIG_TEXT.ADD_TAG_INPUT_PLACEHOLDER}
            variant="outlined"
            value={newTag}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setNewTag(event.target.value);
            }}
          />
          <Button sx={{ ml: 1 }} variant="contained" onClick={addTag}>
            {CONFIG_TEXT.ADD_TAG_BUTTON}
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          {tags.map((tag) => (
            <Chip
              sx={{ mr: 1, mb: 1 }}
              key={`${tag}`}
              label={tag}
              onDelete={() => handleDelete(tag)}
            />
          ))}
        </Box>
      </Box>

      <BaseSnakeBar
        openSnakeBar={openSnakeBar}
        setOpenSnakeBarOpen={setOpenSnakeBarOpen}
        severity="success"
      >
        {CONFIG_TEXT.ADD_TAG_SNAKE_BAR_TEXT}
      </BaseSnakeBar>
    </Box>
  );
}
