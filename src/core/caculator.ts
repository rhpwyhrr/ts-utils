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

/**
 * 减法
 * @param {number} num1 - 被减数
 * @param {number} num2 - 减数
 * @returns {number} 差：浮点数相减的结果
 */
function minus(num1: number, num2: number): number {
  const dLen1: number = decimalLength(num1);
  const dLen2: number = decimalLength(num2);
  const max: number = Math.max(dLen1, dLen2);
  const maxRadix: number = Math.pow(10, max);
  return changeDecimal(
    multiply(num1, maxRadix) - multiply(num2, maxRadix),
    -max
  );
}

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
      console.log(res, mark, oper, "====");
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

// 挂载在原型链上便于调用
(Number as any).prototype.divide = function (arg: number): number {
  const num1: number = this.valueOf();
  return divide(num1, arg);
};

(Number as any).prototype.multiply = function (arg: number): number {
  const num1: number = this.valueOf();
  return multiply(num1, arg);
};

(Number as any).prototype.add = function (arg: number): number {
  const num1: number = this.valueOf();
  return add(num1, arg);
};

(Number as any).prototype.minus = function (arg: number): number {
  const num1: number = this.valueOf();
  return minus(num1, arg);
};

export { divide, multiply, add, minus, multipleCal };
