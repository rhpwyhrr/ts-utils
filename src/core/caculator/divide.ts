import decimalLength from "./decimalLength";
import changeDecimal from "./changeDecimal";
/**
 * 除法
 * @param {number} num1 - 被除数
 * @param {number} num2 - 除数
 * @returns {number} 商：浮点数相除的结果
 * @description 注意结果若直接使用(integer1 / integer2) * Math.pow(10, dLen2 - dLen1)来计算，可能会出现误差，譬如divide(1833.9, 1000)，得出结果为1.8338999999999999。为消除此种情况，改用小数点移位的算法
 */
function divide(num1: number, num2: number): number {
  const dLen1: number = decimalLength(num1);
  const dLen2: number = decimalLength(num2);
  const integer1: number = +num1.toString().replace(".", "");
  const integer2: number = +num2.toString().replace(".", "");
  return changeDecimal(integer1 / integer2, dLen2 - dLen1);
}

export default divide;
