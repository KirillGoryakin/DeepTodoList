import { Box } from '@mui/material';
import { useAppSelector } from 'hooks/reduxHooks';
import { Todo } from './Todo';
import { deepFindInList } from 'utils/deepFindInList';
import { useSearchParams } from 'react-router-dom';
import { getTodoBranches } from 'utils/getTodoBranches';
import { Todo as TodoType } from 'types';

type Props = {
  onDrop: (e: React.DragEvent<HTMLDivElement>, target: TodoType) => void;
  setHolding: (todo: TodoType | null) => void;
  parentId?: string;
};

const TodoList: React.FC<Props> = ({ onDrop, setHolding, parentId }) => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter');
  const s = searchParams.get('s');

  const todoList = useAppSelector(state => state.todo.todoList);
  let todos: TodoType[] = todoList;

  if (parentId) {
    todos = deepFindInList(
      todoList,
      todo => todo.id === parentId
    )[0].children?? [];
  }

  todos = getTodoBranches(
    todos,
    todo => {
      let match = true;
      if (s) {
        match = todo.title.toLowerCase().includes(s.toLowerCase());
        if (!match) return false;
      }
      if (filter === 'done') match = todo.done;
      if (filter === 'undone') match = !todo.done;
      return match;
    }
  );

  todos = [...todos].sort((a, b) => a.order - b.order);
  
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={4}
    >
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          onDrop={onDrop}
          setHolding={setHolding}
        />
      ))}
    </Box>
  );
};

export { TodoList };