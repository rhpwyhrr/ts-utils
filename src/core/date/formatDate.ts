import isValidDate from "./isValidDate";

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

export default formatDate;
