import "allocator/arena";

export function medianTypescriptFilter(buf: Uint8ClampedArray, width: i32, height: i32): Uint8ClampedArray {
  let copy: Uint8ClampedArray = buf;

  // convert each RGB value to 
  // 256 is width and height of the image
  for (let i: i32 = 2; i < width - 3; i++) {
    for (let j: i32 = 2; j < height - 3; j++) {

      let redSum: i32 = 0;
      let indexHelper: i32 = 0;
      indexHelper = (((i - 1) * width * 4) + (j * 4) + 0);
      redSum += buf[5]
      // redSum += buf[(((i - 1) * width * 4) + ((j + 1) * 4) + 0)]
      // redSum += buf[((i * width * 4) + ((j - 1) * 4) + 0)]
      // redSum += buf[((i * width * 4) + (j * 4) + 0)]
      // redSum += buf[((i * width * 4) + ((j + 1) * 4) + 0)]
      // redSum += buf[(((i + 1) * width * 4) + ((j - 1) * 4) + 0)]
      // redSum += buf[(((i + 1) * width * 4) + (j * 4) + 0)]
      // redSum += buf[(((i + 1) * width * 4) + ((j + 1) * 4) + 0)]

      //     let greenSum: i32 = 0;
      //     greenSum += buf[(((i - 1) * width * 4) + ((j - 1) * 4)) + 1]
      //     greenSum += buf[(((i - 1) * width * 4) + (j * 4) + 0) + 1]
      //     greenSum += buf[(((i - 1) * width * 4) + ((j + 1) * 4) + 0) + 1]
      //     greenSum += buf[((i * width * 4) + ((j - 1) * 4) + 0) + 1]
      //     greenSum += buf[((i * width * 4) + (j * 4) + 0) + 1]
      //     greenSum += buf[((i * width * 4) + ((j + 1) * 4) + 0) + 1]
      //     greenSum += buf[(((i + 1) * width * 4) + ((j - 1) * 4) + 0) + 1]
      //     greenSum += buf[(((i + 1) * width * 4) + (j * 4) + 0) + 1]
      //     greenSum += buf[(((i + 1) * width * 4) + ((j + 1) * 4) + 0) + 1]

      //     let blueSum: i32 = 0;
      //     blueSum += buf[(((i - 1) * width * 4) + ((j - 1) * 4)) + 2]
      //     blueSum += buf[(((i - 1) * width * 4) + (j * 4) + 0) + 2]
      //     blueSum += buf[(((i - 1) * width * 4) + ((j + 1) * 4) + 0) + 2]
      //     blueSum += buf[((i * width * 4) + ((j - 1) * 4) + 0) + 2]
      //     blueSum += buf[((i * width * 4) + (j * 4) + 0) + 2]
      //     blueSum += buf[((i * width * 4) + ((j + 1) * 4) + 0) + 2]
      //     blueSum += buf[(((i + 1) * width * 4) + ((j - 1) * 4) + 0) + 2]
      //     blueSum += buf[(((i + 1) * width * 4) + (j * 4) + 0) + 2]
      //     blueSum += buf[(((i + 1) * width * 4) + ((j + 1) * 4) + 0) + 2]

      //     // Copying over the imageData.
      //     buf[((i * width * 4) + (j * 4)) + 0] = redSum / 9;
      //     buf[((i * width * 4) + (j * 4)) + 1] = greenSum / 9;
      //     buf[((i * width * 4) + (j * 4)) + 2] = blueSum / 9;
    }
  }
  return buf;
}

export function thirty_two(): i32 {
  return 32;
}

export { memory }