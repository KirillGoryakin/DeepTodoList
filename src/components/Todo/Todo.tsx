import { Box, Button, Paper, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { AddTodo } from 'components/AddTodo';
import { EditableText } from 'components/EditableText';
import { TodoList } from 'components/TodoList';
import { useAppDispatch } from 'hooks/reduxHooks';
import {
  setTodoTitle,
  removeTodo,
  toggleTodo,
} from 'store/slices/todoSlice';
import { Todo as TodoType } from 'types';
import { DragZone } from './DragZone';

type Props = {
  todo: TodoType;
  onDrop: (e: React.DragEvent<HTMLDivElement>, target: TodoType) => void;
  setHolding: (todo: TodoType | null) => void;
};

const Todo: React.FC<Props> = ({ todo, onDrop, setHolding }) => {
  const dispatch = useAppDispatch();
  const [draggable, setDraggable] = useState(false);
  const todoRef = useRef<HTMLDivElement>(null);
  
  const reset = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.background = 'transparent';
    setHolding(null);
  };
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.style.opacity = '0.5';
    setHolding(todo);
  };
  
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLDivElement;
    target.style.background = '#D6D6D6';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    reset(e);
    if (onDrop) onDrop(e, todo);
  };

  useEffect(() => {
    const el = todoRef.current;
    el?.addEventListener('dragover', handleDragOver, false);
    return () => {
      el?.removeEventListener('dragover', handleDragOver, false);
    };
  }, []);
  
  return (
    <Paper
      elevation={3}
      ref={todoRef}
      style={{ transition: 'background 0.2s ease-in-out' }}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={reset}
      onDrop={handleDrop}
      onDragLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <Box
        position='relative'
        display='flex'
        flexDirection='column'
        gap={2} p={2}
      >
        <Box
          position='absolute'
          right={16}
          top={22}
        ><DragZone todo={todo} setDraggable={setDraggable} /></Box>
        
        <EditableText
          value={todo.title}
          onChange={
            v => dispatch(setTodoTitle({ id: todo.id, title: v.trim() }))
          }
          divProps={{
            style: { marginRight: 64 },
          }}
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

        <TodoList parentId={todo.id} onDrop={onDrop} setHolding={setHolding} />
      </Box>
    </Paper>
  );
};

export { Todo };