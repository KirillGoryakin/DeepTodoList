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
import { addTodo } from 'store/slices/todoSlice';

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo.todoList);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const lastOrder = todos.reduce(
    (acc, v) => v.order > acc ? v.order : acc, 0);

  const handleSubmit = () => {
    if (value.trim().length > 0) {
      dispatch(addTodo({
        id: new Date().getTime() + '',
        title: value.trim(),
        done: false,
        order: lastOrder + 1,
      }));
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