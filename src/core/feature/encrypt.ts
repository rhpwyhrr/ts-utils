import JSEncrypt from "jsencrypt";

const publickeystr =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhNhuAr4UjFv+cj99PbAQWWx9H \
X+3jSRThJqJdXkWUMFMTRay8EYRtPFIiwiOUU4gCh4ePMxiuZJWUBHe1waOkXEFc \
Kg17luhVqECsO+EOLhxa3yHoXA5HcSKlG85hNV3G4uQCr+C8SOE0vCGTnMdnEGmU \
nG1AGGe44YKy6XR4VwIDAQAB";

const encrypt = new JSEncrypt();

/**
 * 加密
 * @param txt - 加密目标字符串
 * @param keyStr - 公钥，可选值 默认为c端常用加密密钥
 * @returns
 */
function encryptfun(txt: string, keyStr?: string) {
  if (!keyStr) keyStr = publickeystr;
  encrypt.setPublicKey(keyStr);
  var nestr = encrypt.encrypt(txt);
  return nestr;
}

export default encryptfun;
