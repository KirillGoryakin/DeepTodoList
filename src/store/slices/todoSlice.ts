import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from 'types';
import { deepFindInList } from 'utils/deepFindInList';

export type TodoState = {
  title: string;
  todoList: Todo[];
};

const initialState: TodoState = {
  title: 'New project',
  todoList: [
    { id: '1', title: 'Eat', done: false, order: 1 },
    { id: '2', title: 'Other', done: false, order: 2 },
    { id: '3', title: 'Sleep', done: false, order: 3 },
  ],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todoList.push(action.payload);
    },
    addChildTodo(state, action: PayloadAction<{ id: string; todo: Todo; }>) {
      const todo = deepFindInList(state.todoList, action.payload.id);
      if (!todo) return;
      if (todo.children) todo.children.push(action.payload.todo);
      else todo.children = [action.payload.todo];
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todoList = state.todoList.filter(({ id }) => id !== action.payload);
    },
    toggleTodo(state, action: PayloadAction<string>) {
      state.todoList = state.todoList
        .map(todo => todo.id === action.payload
          ? { ...todo, done: !todo.done}
          : todo
        );
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export const {
  addTodo,
  addChildTodo,
  removeTodo,
  toggleTodo,
  setTitle,
} = todoSlice.actions;
export default todoSlice.reducer;