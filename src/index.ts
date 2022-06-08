import * as caculator from "./core/caculator";
// import * as date from "./core/date";
import squareToLayout from "./core/feature/squareToLayout";
import compareDate from "./core/date/compareDate";
import cloneDeep from "./core/cloneDeep";
import throttle from "./core/throttle";
import debounce from "./core/debounce";
import flattern from "./core/feature/flatten";
import urlParse from "./core/feature/urlParse";
import urlStringify from "./core/feature/urlStringify";

console.log(caculator.divide(1833.9, 1000));
console.log(caculator.multiply(8.8, 12));
console.log(caculator.add(0.1, 0.36987));
console.log(caculator.minus(0.3, 0.1139));
console.log(caculator.multipleCal("-12.3+(52.9*78.6/5-(9+12.987))*36.58"));
console.log("------------------------------------------------------");
// console.log(date.formatDate("2019-2-08", "YYYY-MM-DD hh:mm:ss"));
// const dateArr = date.getCurrentMonthDates(new Date());
// dateArr.forEach((item) => {
//   console.log(date.formatDate(item));
// });
console.log(squareToLayout(Infinity));
console.log(squareToLayout(NaN));
console.log(squareToLayout(-Infinity));
console.log(squareToLayout(10));
console.log("------------------------------------------------------");
console.log(compareDate(new Date(), "2021-12-22"));
console.log(compareDate(new Date(), "2022/6/7"));
const oriData = {
  id: 0,
  name: "xiaom",
  feature: {
    a: "123",
    b: "987",
    c: "456",
  },
};
const cloneObj = cloneDeep(oriData);
oriData.name = "xiaom2";
console.log(oriData);
console.log(cloneObj);

console.log("------节流开始------------");
// setInterval(
//   throttle(
//     function () {
//       console.log("throttle---");
//     },
//     5000,
//     {
//       leading: true,
//       trailing: false,
//     }
//   ),
//   60
// );

console.log(flattern([1, 2, [4, 6, [3, 9, 8, [10]]]]));

console.log(
  urlParse(
    "https://blog.csdn.net/?a=1&b=function%20()%20%7B%0D%0A%20%20%20%20%20%20%20%20console.log(%22sb%22)%3B%0D%0A%20%20%20%20%7D&c=%5B%22nishuo%22%2C%22ruhe%22%5D&d=%7B%22name%22%3A%22second%22%7D"
  )
);

const p = {
  a: 1,
  b: function () {
    console.log("sb");
  },
  c: ["nishuo", "ruhe"],
  d: {
    name: "second",
  },
  e: /\d+/,
  f: new Date(),
};
console.log(urlStringify(p));
