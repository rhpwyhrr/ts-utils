/**
 * url参数转对象
 * @param url - 可选参数，不传的时候默认解析当前浏览器地址栏参数。形如：https://www.to8to.com/index?a=123&b=456 | ?a=123&b=465 | a=123&b=456
 * @returns
 */
function urlParse(url?: string) {
  const obj: any = {};
  let params: string = "";
  if (!url) {
    params = window.location.search;
  } else {
    params = url;
  }
  const urlArr = params.split("?");
  if (!urlArr) {
    return obj;
  }
  let tarStr: string = "";
  if (urlArr.length === 1) {
    tarStr = urlArr[0];
  } else {
    tarStr = urlArr[1];
  }
  tarStr.split("&").forEach((v, i) => {
    //   要剔除掉非键值对类型的参数
    if (v.indexOf("=") > -1) {
      const items = v.split("="),
        key = items[0],
        value = items[1];
      if (value.indexOf("%") > -1) {
        // 注意此处要考虑Function、Date、RegExp等类型数据字符串，直接用JSON.parse会抛错，用try-catch处理
        try {
          obj[key] = JSON.parse(decodeURIComponent(value));
        } catch (error) {
          obj[key] = decodeURIComponent(value);
        }
      } else {
        obj[key] = value;
      }
    }
  });
  return obj;
}

export default urlParse;
