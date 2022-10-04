export const groupBy = (arr, key) => {
  return arr.reduce((currMap, currObject) => {
    const currKey = currObject[key];
    currMap[currKey] = currMap[currKey] || 0;
    currMap[currKey] += 1;
    return currMap;
  }, {});
};
