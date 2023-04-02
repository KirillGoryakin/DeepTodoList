import { Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { setTitle } from 'store/slices/todoSlice';
import { EditableText } from './EditableText';

const ProjectTitle = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(state => state.todo.title);

  return (
    <Box
      display='flex'
      justifyContent='center'
      mb={2}
    >
      <EditableText
        value={title}
        onChange={value => dispatch(setTitle(value.trim()))}
        filter={value => value.trim().length <= 40}
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