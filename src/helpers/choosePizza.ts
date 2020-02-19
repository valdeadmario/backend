export const findSum = (array: number[], value: number) => {
  const summedValues = [];
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    // Empty the array.
    summedValues.splice(0, summedValues.length);

    sum = array[i];
    summedValues.push(array[i]);

    for (let j = 0; j < array.length; j++) {
      // Make sure not to use the initial value
      if (j !== i) {
        sum += array[j];
        summedValues.push(array[j]);

        if (sum === value) {
          let result = array;
          summedValues.forEach(it => {
            result.splice(
              result.findIndex(item => item === it),
              1
            );
          });
          return result;
        }
        if (sum > value) {
          break;
        }
      }
    }
  }
};
