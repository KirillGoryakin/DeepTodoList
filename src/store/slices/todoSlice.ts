import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from 'types';
import { deepFindInList } from 'utils/deepFindInList';
import { deepRemoveFromList } from 'utils/deepRemoveFromList';

export type TodoState = {
  title: string;
  todoList: Todo[];
};

const initialState: TodoState = {
  title: 'New project',
  todoList: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    importProject(state, action: PayloadAction<TodoState>) {
      const { title, todoList } = action.payload;
      if (title) state.title = title;
      if (todoList) state.todoList = todoList;
    },
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
      state.todoList = deepRemoveFromList(state.todoList, action.payload);
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = deepFindInList(state.todoList, action.payload);
      if (todo) todo.done = !todo.done;
    },
    changeTodoTitle(
      state,
      action: PayloadAction<{ id: string; title: string;}>,
    ) {
      const todo = deepFindInList(state.todoList, action.payload.id);
      if (todo) todo.title = action.payload.title;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export const {
  importProject,
  addTodo,
  addChildTodo,
  removeTodo,
  toggleTodo,
  changeTodoTitle,
  setTitle,
} = todoSlice.actions;
export default todoSlice.reducer;