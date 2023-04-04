import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from 'types';
import { deepFindInList } from 'utils/deepFindInList';
import { deepFilterList } from 'utils/deepFilterList';

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
      const todo = deepFindInList(
        state.todoList,
        todo => todo.id === action.payload.id
      )[0];
      if (!todo) return;
      if (todo.children) todo.children.push(action.payload.todo);
      else todo.children = [action.payload.todo];
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todoList = deepFilterList(
        state.todoList,
        todo => todo.id !== action.payload,
      );
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = deepFindInList(
        state.todoList,
        todo => todo.id === action.payload,
      )[0];
      if (todo) todo.done = !todo.done;
    },
    setTodoTitle(
      state,
      action: PayloadAction<{ id: string; title: string;}>,
    ) {
      const todo = deepFindInList(
        state.todoList,
        todo => todo.id === action.payload.id,
      )[0];
      if (todo) todo.title = action.payload.title;
    },
    setTodoOrder(
      state,
      action: PayloadAction<{ id: string; order: number; }>,
    ) {
      const todo = deepFindInList(
        state.todoList,
        todo => todo.id === action.payload.id,
      )[0];
      if (todo) todo.order = action.payload.order;
    },
    swapTodoOrders(
      state,
      action: PayloadAction<[string, string]>,
    ) {
      const todos = deepFindInList(
        state.todoList,
        todo => action.payload.includes(todo.id),
      );
      if (todos.length === 2) {
        const temp = todos[0].order;
        todos[0].order = todos[1].order;
        todos[1].order = temp;
      }
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
  setTodoTitle,
  setTodoOrder,
  swapTodoOrders,
  setTitle,
} = todoSlice.actions;
export default todoSlice.reducer;