import { Box, Button, Paper, Typography } from '@mui/material';
import { AddTodo } from 'components/AddTodo';
import { EditableText } from 'components/EditableText';
import { TodoList } from 'components/TodoList';
import { useAppDispatch } from 'hooks/reduxHooks';
import {
  changeTodoTitle,
  removeTodo,
  toggleTodo,
} from 'store/slices/todoSlice';
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
        <EditableText
          value={todo.title}
          onChange={
            v => dispatch(changeTodoTitle({ id: todo.id, title: v.trim() }))
          }
        >
          {value => (
            <Typography
              fontSize={20}
              style={{ textDecoration: todo.done ? 'line-through' : 'auto' }}
            >
              {value}
            </Typography>
          )}
        </EditableText>

        <Box display='flex' flexWrap='wrap' gap={2}>
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
          
          <AddTodo parentId={todo.id} />
        </Box>

        <TodoList parentId={todo.id} />
      </Box>
    </Paper>
  );
};

export { Todo };