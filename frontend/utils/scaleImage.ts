import downscale from 'downscale';

function scaleImage(imageBuffer: any, callback: Function) {

  const MAX_SIZE = 1000;

  let tempImg = new Image();
  tempImg.src = imageBuffer.toString();

  tempImg.onload = function () {
    let width = tempImg.naturalWidth;
    let height = tempImg.naturalHeight;

    const ratio = width / height;

    if (ratio > 1) {
      const realWidth = Math.min(MAX_SIZE, width);
      width = realWidth;
      height = realWidth / ratio;
    } else {
      const realHeight = Math.min(MAX_SIZE, height);
      width = realHeight * ratio;
      height = realHeight;
    }

    const options = {
      imageType: 'png',
      // quality: 1,
    };

    downscale(tempImg.src, width, height, options)
      .then((result: WindowBase64) => callback(result));
  }
}

function getFileExtension(filename) {
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}

export default scaleImage;
