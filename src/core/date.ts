/**
 * 检验是否有效的时间格式
 * @param {Date} date - 日期
 * @returns {boolean} true:有效时间格式|false:无效时间格式
 */
function isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * 时间格式化
 * @param {string | number | Date} strDate - 时间字符串、时间戳（13位）、中国标准时间等
 * @param {string} strFormat - 返回格式。可选参数，默认为“YYYY-MM-DD”格式。（例：'YYYY-MM-DD'格式化为：'2022-05-09','YYYY-M-D'格式化为：'2022-5-9'）
 * @returns {string} 参数不合法会返回空字符串
 */
function formatDate(
  strDate: string | number | Date,
  strFormat?: string
): string {
  if (!strDate) return "";
  if (!strFormat) strFormat = "YYYY-MM-DD";
  let newDate: Date;
  if (typeof strDate === "string") {
    newDate = new Date(strDate.replace(/-/g, "/"));
  } else if (typeof strDate === "number") {
    newDate = new Date(strDate);
  } else {
    newDate = strDate;
  }
  if (isValidDate(newDate)) {
    const dict: any = {
      YYYY: newDate.getFullYear(),
      M: newDate.getMonth() + 1,
      D: newDate.getDate(),
      h: newDate.getHours(),
      m: newDate.getMinutes(),
      s: newDate.getSeconds(),
      MM: ("" + (newDate.getMonth() + 101)).substring(1),
      DD: ("" + (newDate.getDate() + 100)).substring(1),
      hh: ("" + (newDate.getHours() + 100)).substring(1),
      mm: ("" + (newDate.getMinutes() + 100)).substring(1),
      ss: ("" + (newDate.getSeconds() + 100)).substring(1),
    };
    return strFormat.replace(/(YYYY|MM?|DD?|hh?|mm?|ss?)/g, function (k) {
      return dict[k];
    });
  }

  return "";
}

/**
 * 解析date成{year,month,day}格式
 * @param date
 * @returns
 */
function getYearMonthDay(date: Date): YearMonthDay {
  const mydate = date instanceof Date ? date : new Date(date);
  const year = mydate.getFullYear();
  const month = mydate.getMonth();
  const day = mydate.getDate();
  return {
    year,
    month,
    day,
  };
}

/**
 * 比较两个时间格式是否相等
 * @param d1
 * @param d2
 * @returns
 */
function compareDate(d1: Date, d2: Date): boolean {
  const { year, month, day } = getYearMonthDay(d1);
  const { year: year2, month: month2, day: day2 } = getYearMonthDay(d2);
  return year === year2 && month === month2 && day === day2;
}

/**
 * 获取当前月份可展示日期集合，可用于日历渲染（以周日-周六为一个周期，循环6次，则有7*6格）
 * @param strDate
 * @returns
 */
function getCurrentMonthDates(strDate: string | number | Date): Date[] {
  if (!strDate) return [];
  let newDate: Date;
  if (typeof strDate === "string") {
    newDate = new Date(strDate.replace(/-/g, "/"));
  } else if (typeof strDate === "number") {
    newDate = new Date(strDate);
  } else {
    newDate = strDate;
  }
  const dateArr: Date[] = [];
  const { year, month } = getYearMonthDay(newDate);
  const curFirstDay = new Date(year, month, 1);
  const curFirstWeek = curFirstDay.getDay();
  const startDay = curFirstDay.getTime() - curFirstWeek * 1000 * 60 * 60 * 24;
  for (let i = 0; i < 42; i++) {
    const curDate = new Date(startDay + i * 1000 * 60 * 60 * 24);
    dateArr.push(curDate);
  }
  return dateArr;
}

export { formatDate, isValidDate, getCurrentMonthDates, compareDate };
