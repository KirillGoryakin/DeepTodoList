import { Todo } from 'types';

export const deepFindInList = (list: Todo[], id: string): Todo | null => {
  for (let i = 0; i < list.length; i++) {
    const curr = list[i];
    if (curr.id === id) return curr;
    if (curr.children) {
      const child = deepFindInList(curr.children, id);
      if (child) return child;
    }
  }
  return null;
};