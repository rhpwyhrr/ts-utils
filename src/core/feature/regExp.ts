const regExp = {
  mobile: /^1[3-9]\d{9}$/, //手机号验证
  mobile2: /^1[3-9]\d[\d\*]{4}\d{4}$/, //手机号验证(带脱敏格式)
  tel: /^(0\d{2,3}-[1-9]\d{6,7})$/, //座机号验证
  msgCode: /\d{6}/, //验证码
};

function validateFunc(reg: RegExp, val: string): boolean {
  return reg.test(val);
}

/**
 * 校验手机号格式
 * @param num 手机号
 * @returns true|false
 */
const isMobile = (num: string): boolean => validateFunc(regExp.mobile, num);

/**
 * 校验手机号格式（包含脱敏格式，如：138****1234）
 * @param num 手机号
 * @returns true|false
 */
const isMaskMobile = (num: string): boolean =>
  validateFunc(regExp.mobile2, num);

/**
 * 校验座机号格式
 * @param num 座机号
 * @returns true|false
 */
const isTel = (num: string): boolean => validateFunc(regExp.tel, num);

/**
 * 校验6位数字的验证码
 * @param code 验证码
 * @returns  true|false
 */
const isMsgCode = (code: string): boolean => validateFunc(regExp.msgCode, code);

export { isMobile, isMaskMobile, isTel, isMsgCode };
