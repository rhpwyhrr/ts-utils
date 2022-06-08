/**
 * 将数组对象序列化成用&连接符拼接的字符串
 * @param obj
 * @returns
 */
function urlStringify(obj: AnyObject) {
  let str: string = "";
  if (!obj) return str;
  for (let key in obj) {
    let val: string = "";
    if (
      Object.prototype.toString.call(obj[key]) === "[object Function]" ||
      Object.prototype.toString.call(obj[key]) === "[object Date]" ||
      Object.prototype.toString.call(obj[key]) === "[object RegExp]"
    ) {
      val = encodeURIComponent(obj[key].toString());
    } else if (typeof obj[key] === "object") {
      val = encodeURIComponent(JSON.stringify(obj[key]));
    } else {
      val = obj[key];
    }
    str += key + "=" + val + "&";
  }
  return str.substring(0, str.length - 1);
}
export default urlStringify;
