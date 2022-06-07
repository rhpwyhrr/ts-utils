import multiply from "./multiply";
import divide from "./divide";
import add from "./add";
import minus from "./minus";
import multipleCal from "./multipleCal";

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

export { add, minus, multiply, divide, multipleCal };
