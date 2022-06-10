import RSAUtilszb from "../../tools/to8torsaszb.js";

/**
 * 手机号加密编码
 * @param phone - 手机号
 * @returns
 */
function encryptNum(phone: string) {
  const rsadata = RSAUtilszb.encryptfun(
    `${phone},${Math.ceil(Math.random() * 10)},${Math.random()}`
  );
  return encodeURIComponent(rsadata);
}

export default encryptNum;
