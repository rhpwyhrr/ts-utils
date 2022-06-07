/**
 * 解析date成{year,month,day}格式
 * @param date
 * @returns
 */
function getYearMonthDay(date: Date | string): YearMonthDay {
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

export default getYearMonthDay;
