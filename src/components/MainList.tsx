import { useState } from 'react';
import { Todo } from 'types';
import { TodoList } from './TodoList';
import { useAppDispatch } from 'hooks/reduxHooks';
import { swapTodoOrders } from 'store/slices/todoSlice';

const MainList = () => {
  const dispatch = useAppDispatch();
  const [holding, setHolding] = useState<Todo | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, target: Todo) => {
    if (!holding) return;
    dispatch(swapTodoOrders([holding.id, target.id]));
    setHolding(null);
  };
  
  return (<TodoList
    onDrop={handleDrop}
    setHolding={setHolding}
  />);
};

export { MainList };