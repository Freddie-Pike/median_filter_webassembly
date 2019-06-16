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

function medianFilter(buf, width, height) {
  let copy = new Uint8ClampedArray(buf);

  // convert each RGB value to 
  // 256 is width and height of the image
  for (i = 2; i < width - 3; i++) {
    for (j = 2; j < height - 3; j++) {

      let redSum = 0;
      redSum += buf[(((i - 1) * width * 4) + ((j - 1) * 4))]
      redSum += buf[(((i - 1) * width * 4) + (j * 4) + 0)]
      redSum += buf[(((i - 1) * width * 4) + ((j + 1) * 4) + 0)]
      redSum += buf[((i * width * 4) + ((j - 1) * 4) + 0)]
      redSum += buf[((i * width * 4) + (j * 4) + 0)]
      redSum += buf[((i * width * 4) + ((j + 1) * 4) + 0)]
      redSum += buf[(((i + 1) * width * 4) + ((j - 1) * 4) + 0)]
      redSum += buf[(((i + 1) * width * 4) + (j * 4) + 0)]
      redSum += buf[(((i + 1) * width * 4) + ((j + 1) * 4) + 0)]

      let greenSum = 0;
      greenSum += buf[(((i - 1) * width * 4) + ((j - 1) * 4)) + 1]
      greenSum += buf[(((i - 1) * width * 4) + (j * 4) + 0) + 1]
      greenSum += buf[(((i - 1) * width * 4) + ((j + 1) * 4) + 0) + 1]
      greenSum += buf[((i * width * 4) + ((j - 1) * 4) + 0) + 1]
      greenSum += buf[((i * width * 4) + (j * 4) + 0) + 1]
      greenSum += buf[((i * width * 4) + ((j + 1) * 4) + 0) + 1]
      greenSum += buf[(((i + 1) * width * 4) + ((j - 1) * 4) + 0) + 1]
      greenSum += buf[(((i + 1) * width * 4) + (j * 4) + 0) + 1]
      greenSum += buf[(((i + 1) * width * 4) + ((j + 1) * 4) + 0) + 1]

      let blueSum = 0;
      blueSum += buf[(((i - 1) * width * 4) + ((j - 1) * 4)) + 2]
      blueSum += buf[(((i - 1) * width * 4) + (j * 4) + 0) + 2]
      blueSum += buf[(((i - 1) * width * 4) + ((j + 1) * 4) + 0) + 2]
      blueSum += buf[((i * width * 4) + ((j - 1) * 4) + 0) + 2]
      blueSum += buf[((i * width * 4) + (j * 4) + 0) + 2]
      blueSum += buf[((i * width * 4) + ((j + 1) * 4) + 0) + 2]
      blueSum += buf[(((i + 1) * width * 4) + ((j - 1) * 4) + 0) + 2]
      blueSum += buf[(((i + 1) * width * 4) + (j * 4) + 0) + 2]
      blueSum += buf[(((i + 1) * width * 4) + ((j + 1) * 4) + 0) + 2]

      // Copying over the imageData.
      copy[((i * width * 4) + (j * 4)) + 0] = Math.floor(redSum / 9);
      copy[((i * width * 4) + (j * 4)) + 1] = Math.floor(greenSum / 9);
      copy[((i * width * 4) + (j * 4)) + 2] = Math.floor(blueSum / 9);
    }
  }
  return copy;
}

function doFilter() {
  // assumes baboon256.png is 256x256
  // get the ImageData from the canvas
  let imageBuffer = ctx.getImageData(0, 0, baboon.width, baboon.width);
  let buf = imageBuffer.data;

  // display the converted image
  let newConvertedImageBuffer = timer("vanilla medianFilter: ", typescriptMedianFilter, buf, baboon.width, baboon.height);
  // let newImageData = new ImageData(newConvertedImageBuffer, baboon.width, baboon.width);
  // ctx.putImageData(newImageData, 0, 0);
  alert('it ran!');
}

function restoreImage() {
  baboon.src = "./baboon.png";
}

const assemblyScriptConfig = {
  env: {
    __memory_base: 0,
    __table_base: 0,
    memory: new WebAssembly.Memory({
      initial: 256,
    }),
    table: new WebAssembly.Table({
      initial: 0,
      element: 'anyfunc',
    }),
    abort: function () { alert('hey'); },
  }
}

fetch("../build/untouched.wasm")
  .then(response => response.arrayBuffer())
  .then(buffer => WebAssembly.instantiate(buffer, assemblyScriptConfig))
  .then(module => {
    window.wasmTypescriptExports = module.instance.exports;
    window.typescriptMedianFilter = module.instance.exports.medianTypescriptFilter;
  });