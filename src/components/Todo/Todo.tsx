import { Box, Button, Paper, Typography } from '@mui/material';
import { useAppDispatch } from 'hooks/reduxHooks';
import { removeTodo, toggleTodo } from 'store/slices/todoSlice';
import { Todo as TodoType } from 'types';

type Props = {
  todo: TodoType;
};

const Todo: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  
  return (
    <Paper elevation={3}>
      <Box
        display='flex'
        flexDirection='column'
        gap={2} p={2}
      >
        <Typography
          fontSize={20}
          style={{ textDecoration: todo.done ? 'line-through' : 'auto' }}
        >
          {todo.title}
        </Typography>

        <Box display='flex' gap={2}>
          <Button
            onClick={() => dispatch(toggleTodo(todo.id))}
            color='primary'
            variant='contained'
            style={{ minWidth: 100 }}
          >
            {todo.done ? 'Undone' : 'Done'}
          </Button>
          <Button
            onClick={() => dispatch(removeTodo(todo.id))}
            color='error'
            variant='contained'
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export { Todo };