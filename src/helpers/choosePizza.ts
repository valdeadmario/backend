export const getSubsetFromArray = (array: number[], sum: number) => {
  function fork(i = 0, s = 0, t: number[] = []) {
    if (s === sum) {
      result.push(t);
      return;
    }
    if (i === array.length) {
      return;
    }
    if (s + array[i] <= sum) {
      fork(i + 1, s + array[i], t.concat(array[i]));
      if (result.length) {
        return;
      }
    }
    fork(i + 1, s, t);
  }
  const result: number[][] = [];
  fork();
  return result;
};
