// Setting Up imageObject Data.
let imageObject = document.getElementById("filter-image");
let globalImageCanvas = document.getElementById('pic');
let ctx = globalImageCanvas.getContext('2d');
let baboon = new Image();
baboon.src = 'baboon.png';
baboon.onload = function () {
  ctx.drawImage(baboon, 0, 0);
}

function timer(callbackName, callback, buf, width, height) {
  console.time(`${callbackName} timer`);
  let callbackReturnValue = callback(buf, width, height);
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

function getMedianOfSum(arr, i, j, width, colour_value) {
  let sum = 0;
  let indexes = getKernal(i, j);
  for ([r, c] of indexes) {
    sum += arr[getIndex(r, c, width) + colour_value];
  }
  return parseInt(sum / 9);
}

function medianFilter(buf, width, height) {
  let copy = new Uint8ClampedArray(buf);

  // convert each RGB value to 
  // 256 is width and height of the image
  for (i = 2; i < width - 3; i++) {
    for (j = 2; j < height - 3; j++) {
      let red = getMedianOfSum(buf, i, j, width, 0);
      let green = getMedianOfSum(buf, i, j, width, 1);
      let blue = getMedianOfSum(buf, i, j, width, 2);
      copy[getIndex(i, j, width) + 0] = red;
      copy[getIndex(i, j, width) + 1] = green;
      copy[getIndex(i, j, width) + 2] = blue;
    }
  }
  return new ImageData(copy, width, height);
}

function doFilter() {
  // assumes baboon256.png is 256x256
  // get the ImageData from the canvas
  let imageBuffer = ctx.getImageData(0, 0, baboon.width, baboon.width);
  let buf = imageBuffer.data;

  // display the converted image
  let newConvertedImageBuffer = timer("vanilla medianFilter: ", medianFilter, buf, baboon.width, baboon.height);
  ctx.putImageData(newConvertedImageBuffer, 0, 0);
}

function restoreImage() {
  baboon.src = "./baboon.png";
}
