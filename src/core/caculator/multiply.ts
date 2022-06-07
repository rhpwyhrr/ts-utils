import decimalLength from "./decimalLength";
import changeDecimal from "./changeDecimal";
/**
 * 乘法
 * @param {number} num1 - 被乘数
 * @param {number} num2 - 乘数
 * @returns {number} 积：浮点数相乘的结果
 * @description 注意结果若直接使用integer1 * integer2 * Math.pow(10, -dLen)来计算，可能会出现误差，譬如multiply(8.8, 12)，得出结果为105.60000000000001。为消除此种情况，改用小数点移位的算法
 */
function multiply(num1: number, num2: number): number {
  let dLen = 0;
  dLen += decimalLength(num1);
  dLen += decimalLength(num2);
  const integer1: number = +num1.toString().replace(".", "");
  const integer2: number = +num2.toString().replace(".", "");
  return changeDecimal(integer1 * integer2, -dLen);
}

export default multiply;
