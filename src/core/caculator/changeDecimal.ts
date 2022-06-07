import decimalLength from "./decimalLength";
/**
 * 移动目标浮点数小数点位置
 * @param {number} tarNum - 目标数据
 * @param {number} radix - 移动位数（负数代表向左移，正数代表向右移）
 * @returns {number} 移动后的结果
 */
function changeDecimal(tarNum: number, radix: number): number {
  const dLen: number = decimalLength(tarNum);
  const newRadix: number = radix - dLen;
  const numStr: string = tarNum.toString().replace(".", "");
  if (newRadix > 0) {
    //右移动
    let tail = "";
    let z = newRadix;
    while (z > 0) {
      tail += "0";
      z--;
    }
    return +(numStr + tail);
  } else if (newRadix < 0) {
    //左移动
    let res: number;
    const len = numStr.length;
    if (len > Math.abs(newRadix)) {
      //移动不过界
      const numArr = numStr.split("");
      numArr.splice(len - Math.abs(newRadix), 0, ".");
      res = +numArr.join("");
    } else {
      //移动过界
      let z = Math.abs(newRadix) - len;
      let tail = "";
      while (z > 0) {
        tail += "0";
        z--;
      }
      res = +("0." + tail + numStr);
    }
    return res;
  } else {
    //不移动
    return +numStr;
  }
}

export default changeDecimal;
