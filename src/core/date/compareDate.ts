import getYearMonthDay from "./getYearMonthDay";

/**
 * 比较两个时间格式是否相等
 * @param d1
 * @param d2
 * @returns
 */
function compareDate(d1: Date | string, d2: Date | string): boolean {
  const { year, month, day } = getYearMonthDay(d1);
  const { year: year2, month: month2, day: day2 } = getYearMonthDay(d2);
  return year === year2 && month === month2 && day === day2;
}

export default compareDate;
