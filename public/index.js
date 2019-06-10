// Setting Up imageObject Data.
let imageObject = document.getElementById("filter-image");

// Generates a 2D array of the image pixels to make the calculations easier to manage.
function generate2DArrayOfImagePixels(imagePixels, height, width) {
  let image2DArray = [...Array(height)].map(x => Array(width).fill(0));
  for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
      let k = (i * 4 * imagePixels.width) + (j * 4);
      let r = imagePixels.data[k];
      let g = imagePixels.data[k + 1];
      let b = imagePixels.data[k + 2];
      image2DArray[i][j] = { r: r, g: g, b: b };
    }
  }
  return image2DArray;
}

function doVanillaJSMedianFiler(imagePixels, image2DArray, height, width) {
  for (i = 2; i < height - 3; i++) {
    for (j = 2; j < width - 3; j++) {
      let kernalRedCalculation = (image2DArray[i + 1][j - 1].r + image2DArray[i + 1][j].r + image2DArray[i + 1][j + 1].r + image2DArray[i][j - 1].r + image2DArray[i][j].r + image2DArray[i][j + 1].r + image2DArray[i - 1][j - 1].r + image2DArray[i - 1][j].r + image2DArray[i - 1][j + 1].r) / 9;
      let kernalGreenCalculation = (image2DArray[i + 1][j - 1].g + image2DArray[i + 1][j].g + image2DArray[i + 1][j + 1].g + image2DArray[i][j - 1].g + image2DArray[i][j].g + image2DArray[i][j + 1].g + image2DArray[i - 1][j - 1].g + image2DArray[i - 1][j].g + image2DArray[i - 1][j + 1].g) / 9;
      let kernalBlueCalculation = (image2DArray[i + 1][j - 1].b + image2DArray[i + 1][j].b + image2DArray[i + 1][j + 1].b + image2DArray[i][j - 1].b + image2DArray[i][j].b + image2DArray[i][j + 1].b + image2DArray[i - 1][j - 1].b + image2DArray[i - 1][j].b + image2DArray[i - 1][j + 1].b) / 9;
      image2DArray[i][j] = { r: kernalRedCalculation, g: kernalGreenCalculation, b: kernalBlueCalculation };
    }
  }
  for (let i = 0; i < imagePixels.height; i++) {
    for (let j = 0; j < imagePixels.width; j++) {
      let x = (i * 4 * imagePixels.width) + (j * 4);
      imagePixels.data[x] = image2DArray[i][j].r;
      imagePixels.data[x + 1] = image2DArray[i][j].g;
      imagePixels.data[x + 2] = image2DArray[i][j].b;
    }
  }
  return imagePixels;
}

function doMedianFilter(imageObject, implementionType) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let width = imageObject.width;
  let height = imageObject.height;
  canvas.width = width
  canvas.height = height
  ctx.drawImage(imageObject, 0, 0);

  let imagePixels = ctx.getImageData(0, 0, width, height);
  let image2DArray = generate2DArrayOfImagePixels(imagePixels, height, width);
  if (implementionType === 'vanilla-js') {
    imagePixels = timer(
      "doVanillaJSMedianFiler",
      doVanillaJSMedianFiler,
      imagePixels, image2DArray, height, width
    );
  }
  else {
    throw "Invalid implementType!";
  }

  ctx.putImageData(imagePixels, 0, 0, 0, 0, imagePixels.width, imagePixels.height);

  return canvas.toDataURL();
}


function timer(callbackName, callback, imagePixels, image2DArray, height, width) {
  console.time(`${callbackName} timer`);
  let callbackReturnValue = callback(imagePixels, image2DArray, height, width);
  console.timeEnd(`${callbackName} timer`);
  return callbackReturnValue;
}

function doFilter(implementionType) {
  imageObject.src = doMedianFilter(imageObject, implementionType);
}

function restoreImage() {
  imageObject.src = "./baboon.png";
}
