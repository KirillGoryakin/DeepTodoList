
export interface Todo {
  id: string;
  title: string;
  done: boolean;
  order: number;
  children?: Todo[];
}