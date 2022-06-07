import multiply from "./multiply";
import divide from "./divide";
import add from "./add";
import minus from "./minus";
/**
 * 多项式计算
 * @param {string} multStr - 多项式字符串,例：'-12.3+(52.9*78.6/5-(9+12.987))*36.58'
 * @returns {number} 计算结果
 */
function multipleCal(multStr: string): number {
  if (!multStr) return 0;
  // 核心:无括号多项式计算方法
  function calFunc(subStr: string): number {
    const reg = /([1-9]\d*\.\d+|0\.\d+|[1-9]\d*|0)|[+\-*/]/g;
    // 1、分解成数组
    const arr: string[] = subStr.match(reg) as string[];
    // 没有匹配到项数，或者形如-12.3|+12.3这种的直接返回
    if (arr.length === 0) {
      return 0;
    } else if (arr.length < 3) {
      return +arr.join("");
    }
    // 2、运算优先级：从左往右扫描，遇到*或者/进行一次计算，然后把值存起来，否则直接存储，第二次扫描的时候只剩下+-，则依次计算
    const newArr: string[] = [];
    for (let i = 0; i < arr.length; ) {
      if (arr[i] === "*") {
        const prev: string = newArr.pop() as string;
        newArr.push(multiply(+prev, +arr[i + 1]) + "");
        i += 2;
      } else if (arr[i] === "/") {
        const prev: string = newArr.pop() as string;
        newArr.push(divide(+prev, +arr[i + 1]) + "");
        i += 2;
      } else {
        newArr.push(arr[i]);
        i++;
      }
    }
    let res: string = newArr.shift() as string;
    let mark: string;
    let oper: string;
    while (newArr.length > 1) {
      if (/^[+-]$/.test(res)) {
        //要加起止和终止限制，否则会把负浮点数匹配上导致计算出错
        mark = res;
        res = "0";
      } else {
        mark = newArr.shift() as string;
      }
      oper = newArr.shift() as string;
      res = mark === "+" ? add(+res, +oper) + "" : minus(+res, +oper) + "";
    }
    return +res;
  }
  // 带括号的需要先进行脱括号处理，否则直接计算
  if (/[()]/g.test(multStr)) {
    const charas: string[] = multStr.split("");
    const tempCharas: string[] = [];
    for (let i = 0; i < charas.length; i++) {
      if (charas[i] === ")") {
        let last: string = tempCharas.pop() as string;
        const calStr: string[] = [];
        while (last !== "(") {
          calStr.unshift(last);
          last = tempCharas.pop() as string;
        }
        tempCharas.push(calFunc(calStr.join("")) + "");
      } else {
        tempCharas.push(charas[i]);
      }
    }
    return calFunc(tempCharas.join(""));
  } else {
    return calFunc(multStr);
  }
}

export default multipleCal;
