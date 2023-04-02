import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { addChildTodo, addTodo } from 'store/slices/todoSlice';
import { deepFindInList } from 'utils/deepFindInList';
import { Todo } from 'types';

type Props = {
  parentId?: string;
};

const AddTodo: React.FC<Props> = ({ parentId }) => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(state => state.todo.todoList);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const todos = parentId
    ? deepFindInList(todoList, parentId)?.children ?? todoList
    : todoList;

  const lastOrder = todos.reduce((a, v) => v.order > a ? v.order : a, 0);

  const handleSubmit = () => {
    if (value.trim().length > 0) {
      const todo: Todo = {
        id: new Date().getTime() + '',
        title: value.trim(),
        done: false,
        order: lastOrder + 1,
      };

      if (parentId)
        dispatch(addChildTodo({ id: parentId, todo }));
      else
        dispatch(addTodo(todo));

      setOpen(false);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <AddCircleIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Todo title</DialogTitle>
        <DialogContent>
          <TextField
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            variant='outlined'
            placeholder='Title'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained'>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AddTodo };