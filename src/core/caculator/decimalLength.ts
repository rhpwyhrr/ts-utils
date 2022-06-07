/**
 * 计算目标浮点数的小数点后长度
 * @param {number} num - 目标数据
 * @returns {number} 目标数据小数点后长度
 */
function decimalLength(num: number): number {
  let len: number;
  try {
    len = num.toString().split(".")[1].length;
  } catch (error) {
    len = 0;
  }
  return len;
}

export default decimalLength;
