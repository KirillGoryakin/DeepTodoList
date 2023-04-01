import { useState } from 'react';
import { Typography, Box, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { setTitle } from 'store/slices/todoSlice';

const ProjectTitle = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(state => state.todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 40)
      dispatch(setTitle(e.target.value));
  };
  
  if (isEditing) return (
    <Box
      display='flex'
      justifyContent='center'
      mb={4}
    >
      <TextField
        value={title}
        onChange={handleChange}
        onBlur={() => setIsEditing(false)}
        onKeyDown={e => e.key === 'Enter' && setIsEditing(false)}
        autoFocus
        onFocus={e => e.target.select()}
        variant='outlined'
        size='small'
        style={{ fontSize: 24 }}
      />
    </Box>
  );

  return (
    <Typography
      className='title'
      fontSize={24}
      fontWeight={700}
      textAlign='center'
      mb={4}
    >
      <span
        className='title__inner'
        onClick={() => setIsEditing(true)}
      >
        {title}
      </span>
    </Typography>
  );
};

export { ProjectTitle };