const faker = require("faker");
const skuGen = require("shortid");
const fs = require("fs");

const numRecordsToGenerate = 1000; // 10M records
const numberOfSeparateFiles = 10;

const generateRandomColorArray = upTo => {
  const numColors = Math.ceil(upTo * Math.random());
  const colors = {};
  for (let i = 0; i < numColors; i++) {
    let currentColor = faker.commerce.color();
    colors[currentColor] = currentColor;
  }
  return Object.keys(colors);
};

const generateRandomImages = upTo => {
  const numImages = Math.ceil(upTo * Math.random());
  const images = [];
  for (let i = 0; i < numImages; i++) {
    let currentImageUrl = faker.image.imageUrl();
    images.push(currentImageUrl);
  }
  return images;
};
for (let fileNumber = 0; fileNumber < numberOfSeparateFiles; fileNumber++) {
  // try {
  //   fs.writeFileSync(`./json-records${fileNumber}.json`, {});
  // } catch (err) {
  //   console.log("THERE WAS AN ERROR WRITING HEADERS");
  // }

  for (
    let entry = 0;
    entry < numRecordsToGenerate / numberOfSeparateFiles;
    entry++
  ) {
    if (entry % 1000 === 0) {
      console.clear();
      console.log(
        `File Number: ${fileNumber + 1} of ${numberOfSeparateFiles}: ` +
          (
            100 *
            (entry / (numRecordsToGenerate / numberOfSeparateFiles))
          ).toFixed(0) +
          "%"
      );
    }

    let shoe = {
      sku: skuGen.generate() + "",
      productName: faker.commerce.productName(),
      category: faker.commerce.department(),
      color: generateRandomColorArray(20),
      price: (150 * Math.random()).toFixed(2),
      images: generateRandomImages(12)
    };

    console.log(shoe);
    // try {
    //   fs.appendFileSync(`./json-records${fileNumber}.csv`, currentEntry);
    // } catch (err) {
    //   console.error(err);
    // }
  }
}
