function squareToLayout(squareNum: number): object {
  const square = Number(squareNum);
  let data = {};
  if (square + "" === "NaN" || square === Infinity || square === -Infinity) {
    return data;
  }
  if (square <= 59 && square >= 30) {
    data = { fang: 1, ting: 1, chu: 1, wei: 1, yangtai: 1 };
  } else if (square <= 89 && square >= 60) {
    data = { fang: 2, ting: 1, chu: 1, wei: 1, yangtai: 1 };
  } else if (square <= 149 && square >= 90) {
    data = { fang: 3, ting: 2, chu: 1, wei: 2, yangtai: 1 };
  } else if (square <= 249 && square >= 150) {
    data = { fang: 4, ting: 2, chu: 1, wei: 2, yangtai: 2 };
  } else if (square > 249) {
    data = { fang: 4, ting: 2, chu: 1, wei: 3, yangtai: 2 };
  } else {
    data = { fang: 1, ting: 0, chu: 1, wei: 1, yangtai: 0 };
  }
  return data;
}

export default squareToLayout;
