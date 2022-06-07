/**
 * 检验是否有效的时间格式
 * @param {Date} date - 日期
 * @returns {boolean} true:有效时间格式|false:无效时间格式
 */
function isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

export default isValidDate;
