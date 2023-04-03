import { Todo } from 'types';
import { deepFindInList } from './deepFindInList';

export const getTodoBranches = (
  list: Todo[],
  fn: (todo: Todo) => boolean,
): Todo[] => {
  const res: Todo[] = [];
  for (let i = 0; i < list.length; i++) {
    const curr = list[i];
    if (fn(curr)) {
      res.push(curr);
      continue;
    }
    if (!curr.children?.length) continue;
    const todos = deepFindInList(curr.children, fn);
    if (todos.length) res.push(curr);
  }
  return res;
};