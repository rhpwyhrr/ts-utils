/**
 * 图片转化base64
 * @param img 图片dom
 */
function imageToBase64(img: HTMLElement | any): string {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx: any = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const dataURL = canvas.toDataURL("image/png");
  return dataURL;
}

export default imageToBase64;
