let imageObject = document.getElementById("filter-image");


function doMedianFilter(imageObject) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let width = imageObject.width;
  let height = imageObject.height;
  canvas.width = width
  canvas.height = height

  ctx.drawImage(imageObject, 0, 0);

  let imagePixels = ctx.getImageData(0, 0, width, height);
  let data = imagePixels.data;

  let image2DArray = [...Array(height)].map(x => Array(width).fill(0));;

  for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
      let k = (i * 4 * imagePixels.width) + (j * 4);
      let r = imagePixels.data[k];
      let g = imagePixels.data[k + 1];
      let b = imagePixels.data[k + 2];
      image2DArray[i][j] = { r: r, g: g, b: b };
    }
  }

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
      let x = (i * 4) * imagePixels.width + (j * 4);
      imagePixels.data[x] = image2DArray[i][j].r;
      imagePixels.data[x + 1] = image2DArray[i][j].g;
      imagePixels.data[x + 2] = image2DArray[i][j].b;
    }
  }


  ctx.putImageData(imagePixels, 0, 0, 0, 0, imagePixels.width, imagePixels.height);

  return canvas.toDataURL();
}


function timer(callbackName, callback, parameters) {
  console.time(`${callbackName} timer`);
  let callbackReturnValue = callback(parameters);
  console.timeEnd(`${callbackName} timer`);
  return callbackReturnValue;
}

// function executeFibonacci() {
//   WebAssembly.instantiateStreaming(fetch('../target/wasm32-unknown-unknown/release/rust_fibo.wasm'), {})
//     .then(module => {
//       const rustFibo = module.instance.exports.rust_fibo;
//       WebAssembly.instantiateStreaming(fetch('../build/optimized.wasm'), {})
//         .then(module => {
//           alert('test');
//         });
//     });
// }

function doFilter() {
  imageObject.src = doMedianFilter(imageObject);
}

function restoreImage() {
  imageObject.src = "./baboon.png";
}
