/**
 * 数组拍平
 * @param arr - 形如：[1, 2, [4, 6, [3, 9, 8, [10]]]]
 * @returns 返回拍平的数组，如：[ 1, 2, 4,  6, 3, 9, 8, 10 ]
 */
function flatten(arr: any[]): any[] {
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

export default flatten;
