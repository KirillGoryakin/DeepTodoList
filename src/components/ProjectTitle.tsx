import { useState } from 'react';
import { Typography, Box, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { setTitle } from 'store/slices/todoSlice';
import { EditableText } from './EditableText';

const ProjectTitle = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(state => state.todo.title);

  const handleChange = (value: string) => {
    if (value.length <= 40)
      dispatch(setTitle(value));
  };
  
  // if (isEditing) return (
  //   <Box
  //     display='flex'
  //     justifyContent='center'
  //     mb={4}
  //   >
  //     <TextField
  //       value={title}
  //       onChange={handleChange}
  //       onBlur={() => setIsEditing(false)}
  //       onKeyDown={e => e.key === 'Enter' && setIsEditing(false)}
  //       autoFocus
  //       onFocus={e => e.target.select()}
  //       variant='outlined'
  //       size='small'
  //       style={{ fontSize: 24 }}
  //     />
  //   </Box>
  // );

  return (
    <Box
      display='flex'
      justifyContent='center'
      mb={4}
    >
      <EditableText
        value={title}
        onChange={handleChange}
      >
        {value => (
          <Typography
            className='title'
            fontSize={24}
            fontWeight={700}
            textAlign='center'
          >
            {value}
          </Typography>
        )}
      </EditableText>
    </Box>
  );
};

export { ProjectTitle };