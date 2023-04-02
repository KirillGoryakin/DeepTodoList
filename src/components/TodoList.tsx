import { Box } from '@mui/material';
import { useAppSelector } from 'hooks/reduxHooks';
import { Todo } from './Todo';
import { deepFindInList } from 'utils/deepFindInList';

type Props = {
  parentId?: string;
};

const TodoList: React.FC<Props> = ({ parentId }) => {
  const todoList = useAppSelector(state => state.todo.todoList);
  const todos = parentId
    ? deepFindInList(todoList, parentId)?.children ?? []
    : todoList;
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