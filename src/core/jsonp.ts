/**
 * 发送json请求
 * @param url - 请求链接
 * @param data - 请求参数
 * @returns
 */
const jsonp = (url: string, data: AnyObject = {}) => {
  if (!url) throw new Error("url is necessary");
  return new Promise((resolve) => {
    const callbackName: string =
      "jsonpCallback" + Math.random().toString().substr(9, 18);
    const script = document.createElement("script");
    const HEADER = document.getElementsByTagName("head")[0];
    script.setAttribute("type", "text/javascript");
    let queryString = `&_t=${Date.now()}`;
    if (data) {
      for (const key in data) {
        queryString += `&${key}=${encodeURIComponent(data[key])}`;
      }
    }
    script.src = `${
      url.indexOf("?") !== -1 ? url + "&" : url + "?"
    }callback=${callbackName}${queryString}`;
    (window as any)[callbackName] = function (response: any) {
      resolve(response);
      HEADER.removeChild(script);
      delete (window as any)[callbackName];
    };
    HEADER.appendChild(script);
  });
};
export default jsonp;
