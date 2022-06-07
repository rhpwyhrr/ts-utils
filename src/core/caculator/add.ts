import decimalLength from "./decimalLength";
import changeDecimal from "./changeDecimal";
import multiply from "./multiply";
/**
 * 加法
 * @param {number} num1 - 加数1
 * @param {number} num2 - 加数2
 * @returns {number} 和：浮点数相加的结果
 */
function add(num1: number, num2: number): number {
  const dLen1: number = decimalLength(num1);
  const dLen2: number = decimalLength(num2);
  const max: number = Math.max(dLen1, dLen2);
  const maxRadix: number = Math.pow(10, max);
  return changeDecimal(
    multiply(num1, maxRadix) + multiply(num2, maxRadix),
    -max
  );
}

export default add;
