import { Todo } from 'types';

export const deepFilterList = (
  list: Todo[],
  fn: (todo: Todo) => boolean,
): Todo[] => {
  const filtered = list.filter(fn);
  for (let i = 0; i < filtered.length; i++) {
    const curr = filtered[i];
    if (curr.children?.length)
      curr.children = deepFilterList(curr.children, fn);
  }
  return filtered;
};