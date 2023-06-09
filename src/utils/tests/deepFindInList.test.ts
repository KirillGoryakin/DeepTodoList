import { Todo } from 'types';
import { deepFindInList as _ } from 'utils/deepFindInList';

const createTodo = (
  id: string = new Date().getTime()+'',
  title: string = `Title ${id}`,
  done: boolean = false,
  order: number = 0,
  children?: Todo[],
): Todo => ({ id, title, done, order, children });

describe('deepFindInList', () => {
  it('should find Todo on the first level with ID', () => {
    const expected = createTodo('2', 'This one');
    const list = [
      createTodo('1'),
      expected,
      createTodo('3'),
    ];

    const res = _(list, todo => todo.id === '2');
    expect(res).toHaveLength(1);
    expect(res[0]).toBe(expected);
    res[0].order = 555;
    expect(list[1].order).toEqual(555);
  });

  it('should find Todo on the first level with title', () => {
    const expected = createTodo('2', 'This one');
    const list = [
      createTodo('1'),
      expected,
      createTodo('3'),
    ];

    const res = _(list, todo => todo.title === 'This one');
    expect(res).toHaveLength(1);
    expect(res[0]).toBe(expected);
    res[0].order = 555;
    expect(list[1].order).toEqual(555);
  });

  it('should find Todo on the second level with ID', () => {
    const expected = createTodo('555', 'I am deep');
    const list = [
      createTodo(),
      createTodo('2', '', false, 0, [
        createTodo(),
        createTodo(),
        createTodo(),
        expected,
        createTodo(),
      ]),
      createTodo('3', '', false, 0, [
        createTodo(),
        createTodo(),
        createTodo(),
      ]),
    ];

    const res = _(list, todo => todo.id === '555');
    expect(res).toHaveLength(1);
    expect(res[0]).toBe(expected);
    res[0].order = 555;
    // @ts-ignore
    expect(list[1].children[3].order).toEqual(555);
  });

  it('should find Todo on the second level with title', () => {
    const expected = createTodo('555', 'I am deep');
    const list = [
      createTodo(),
      createTodo('2', '', false, 0, [
        createTodo(),
        createTodo(),
        createTodo(),
        expected,
        createTodo(),
      ]),
      createTodo('3', '', false, 0, [
        createTodo(),
        createTodo(),
        createTodo(),
      ]),
    ];

    const res = _(list, todo => todo.title === 'I am deep');
    expect(res).toHaveLength(1);
    expect(res[0]).toBe(expected);
    res[0].order = 555;
    // @ts-ignore
    expect(list[1].children[3].order).toEqual(555);
  });

  it('should find Todo in a deeply nested list with ID', () => {
    const expected = createTodo('555666', 'Find me! I dare you!');
    const list = [
      createTodo('1', '', false, 0, [
        createTodo(),
        createTodo(),
        createTodo('11', '', false, 0, [
          createTodo('111', '', false, 0, [
            createTodo(),
            createTodo(),
            createTodo('1111', '', false, 0, [
              createTodo(),
              createTodo(),
              createTodo(),
              createTodo(),
            ]),
            createTodo(),
          ]),
          createTodo(),
          createTodo(),
          createTodo(),
        ]),
        createTodo(),
      ]),
      createTodo(),
      createTodo('91', '', false, 0, [
        createTodo(),
        createTodo(),
        createTodo(),
        createTodo(),
      ]),
      createTodo('4', '', false, 0, [
        createTodo('41', '', false, 0, [
          createTodo(),
          createTodo('411', '', false, 0, [
            createTodo(),
            createTodo(),
            createTodo('4111', '', false, 0, [
              createTodo(),
              createTodo(),
              expected,
              createTodo(),
            ]),
            createTodo(),
          ]),
          createTodo(),
          createTodo(),
        ]),
        createTodo('42', '', false, 0, [
          createTodo(),
          createTodo(),
          createTodo(),
          createTodo(),
        ]),
        createTodo(),
        createTodo(),
      ]),
      createTodo(),
    ];

    const res = _(list, todo => todo.id === '555666');
    expect(res).toHaveLength(1);
    expect(res[0]).toBe(expected);
    res[0].order = 555;
    // @ts-ignore
    expect(list[3].children[0].children[1].children[2].children[2].order)
      .toEqual(555);
  });

  it('should find Todo in a deeply nested list with title', () => {
    const expected = createTodo('555666', 'Find me! I dare you!');
    const list = [
      createTodo('1', '', false, 0, [
        createTodo(),
        createTodo(),
        createTodo('11', '', false, 0, [
          createTodo('111', '', false, 0, [
            createTodo(),
            createTodo(),
            createTodo('1111', '', false, 0, [
              createTodo(),
              createTodo(),
              createTodo(),
              createTodo(),
            ]),
            createTodo(),
          ]),
          createTodo(),
          createTodo(),
          createTodo(),
        ]),
        createTodo(),
      ]),
      createTodo(),
      createTodo('91', '', false, 0, [
        createTodo(),
        createTodo(),
        createTodo(),
        createTodo(),
      ]),
      createTodo('4', '', false, 0, [
        createTodo('41', '', false, 0, [
          createTodo(),
          createTodo('411', '', false, 0, [
            createTodo(),
            createTodo(),
            createTodo('4111', '', false, 0, [
              createTodo(),
              createTodo(),
              expected,
              createTodo(),
            ]),
            createTodo(),
          ]),
          createTodo(),
          createTodo(),
        ]),
        createTodo('42', '', false, 0, [
          createTodo(),
          createTodo(),
          createTodo(),
          createTodo(),
        ]),
        createTodo(),
        createTodo(),
      ]),
      createTodo(),
    ];

    const res = _(list, todo => todo.title === 'Find me! I dare you!');
    expect(res).toHaveLength(1);
    expect(res[0]).toBe(expected);
    res[0].order = 555;
    // @ts-ignore
    expect(list[3].children[0].children[1].children[2].children[2].order)
      .toEqual(555);
  });
});

export {};