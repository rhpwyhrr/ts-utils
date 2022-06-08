/**
 * url参数转对象
 * @param url - 可选参数，不传的时候默认解析当前浏览器地址栏参数
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
  if (!urlArr || urlArr.length < 2) {
    return obj;
  }
  urlArr[1].split("&").forEach((v, i) => {
    //   要剔除掉非键值对类型的参数
    if (v.indexOf("=") > -1) {
      const items = v.split("="),
        key = items[0],
        value = items[1];
      // 注意此处要考虑Function、Date、RegExp等类型数据
      //   const decodeValue = decodeURIComponent(value)

      obj[key] =
        value.indexOf("%") > -1 ? JSON.parse(decodeURIComponent(value)) : value;
    }
  });
  return obj;
}

export default urlParse;
