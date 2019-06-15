// Setting Up imageObject Data.
let imageObject = document.getElementById("filter-image");
let globalImageCanvas = document.getElementById('pic');
let ctx = globalImageCanvas.getContext('2d');
let baboon = new Image();
baboon.src = 'baboon.png';
baboon.onload = function () {
  ctx.drawImage(baboon, 0, 0);
}

function timer(callbackName, callback, imagePixels, image2DArray, height, width) {
  console.time(`${callbackName} timer`);
  let callbackReturnValue = callback(imagePixels, image2DArray, height, width);
  console.timeEnd(`${callbackName} timer`);
  return callbackReturnValue;
}

function getKernal(i, j) {
  return [
    [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
    [i, j - 1], [i, j], [i, j + 1],
    [i + 1, j - 1], [i + 1, j], [i + 1, j + 1],
  ]
}

function getIndex(i, j, width) {
  return (i * width * 4) + (j * 4);
}

function optimizedMed(arr, i, j, colour_value) {
  let sum = 0;
  let indexes = getKernal(i, j);
  for ([r, c] of indexes) {
    sum += arr[getIndex(r, c, 256) + colour_value];
  }
  return parseInt(sum / 9);
}

function doFilter() {
  // assumes baboon256.png is 256x256
  // get the ImageData from the canvas
  let imageBuffer = ctx.getImageData(0, 0, 256, 256);
  let buf = imageBuffer.data;
  let copy = new Uint8ClampedArray(buf);

  // convert each RGB value to 
  // 256 is width and height of the image
  for (i = 2; i < 256 - 3; i++) {
    for (j = 2; j < 256 - 3; j++) {
      let red = optimizedMed(buf, i, j, 0);
      let green = optimizedMed(buf, i, j, 1);
      let blue = optimizedMed(buf, i, j, 2);
      copy[getIndex(i, j, 256) + 0] = red;
      copy[getIndex(i, j, 256) + 1] = green;
      copy[getIndex(i, j, 256) + 2] = blue;
    }
  }
  let newImageData = new ImageData(copy, 256, 256);

  // display the converted image
  ctx.putImageData(newImageData, 0, 0);
}

function restoreImage() {
  baboon.src = "./baboon.png";
}
