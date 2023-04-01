import { Todo } from 'types';

export const deepFindInList = (list: Todo[], id: string): Todo | null => {
  for (let i = 0; i < list.length; i++) {
    const current = list[i];
    if (current.id === id) return current;
    if (current.children) {
      const child = deepFindInList(current.children, id);
      if (child) return child;
    }
  }
  return null;
};