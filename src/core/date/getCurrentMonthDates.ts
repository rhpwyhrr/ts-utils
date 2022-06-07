import getYearMonthDay from "./getYearMonthDay";

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

export default getCurrentMonthDates;
