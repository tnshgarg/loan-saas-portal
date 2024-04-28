export function coalesce(arrays) {
  if (!arrays || arrays.length === 0) return [];
  let [array] = arrays;
  if (array && array?.length > 0) return array;
  return coalesce(arrays.slice(1));
}
