import { Todo } from 'types';

export const deepRemoveFromList = (list: Todo[], id: string): Todo[] => {
  const filtered = list.filter(todo => todo.id !== id);
  for (let i = 0; i < filtered.length; i++) {
    const curr = filtered[i];
    if (curr.children)
      curr.children = deepRemoveFromList(curr.children, id);
  }
  return filtered;
};