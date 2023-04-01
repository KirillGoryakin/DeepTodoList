import { Box } from '@mui/material';
import { useAppSelector } from 'hooks/reduxHooks';
import { Todo } from './Todo';

const TodoList = () => {
  const todos = useAppSelector(state => state.todo.todoList);
  const sorted = [...todos].sort((a, b) => a.order - b.order);
  
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={4}
    >
      {sorted.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Box>
  );
};

export { TodoList };