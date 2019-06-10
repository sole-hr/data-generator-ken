//mongoimport -d sdc -c carousel --type csv --file records0.csv --headerline
require("dotenv").config();
const faker = require("faker");
const skuGen = require("shortid");
const fs = require("fs");

const numRecordsToGenerate = process.env.NUMRECORDS; // 10M records
const numberOfSeparateFiles = process.env.NUMFILES;

let currentSKU = 0;

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

const generateRelatedShoeObj = () => {
  let shoe = {
    itemSku: Math.ceil(numRecordsToGenerate * Math.random()),
    productName: faker.commerce.productName(),
    category: faker.commerce.department(),
    price: (150 * Math.random()).toFixed(2),
    image: faker.image.imageUrl()
  };
  return shoe;
};

for (let fileNumber = 0; fileNumber < numberOfSeparateFiles; fileNumber++) {
  let currentJSONArray = [];
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

    let relatedShoes = [];
    for (let i = 0; i < 12; i++) {
      relatedShoes.push(generateRelatedShoeObj());
    }

    let currentRecord = {
      currentSku: currentSKU,
      relatedShoes: relatedShoes
    };

    currentJSONArray.push(currentRecord);
    currentSKU++;
  }

  fs.writeFileSync(
    `./jsondata/records-json${fileNumber}.json`,
    JSON.stringify(currentJSONArray)
  );
}
