import { Todo } from 'types';

export const deepFindInList = (
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
    if (curr.children?.length) {
      const foundChildren = deepFindInList(curr.children, fn);
      res.push(...foundChildren);
    }
  }
  return res;
};