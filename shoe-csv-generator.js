//mongoimport -d sdc -c carousel --type csv --file records0.csv --headerline
require("dotenv").config();
const faker = require("faker");
const fs = require("fs");

const numRecordsToGenerate = process.env.NUM_RECORDS; // 10M records
const numberOfSeparateFiles = process.env.NUM_FILES_SHOES;

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

const generateRandomSKUs = numRelated => {
  const relatedShoeObj = {};
  for (let i = 0; i < numRelated; i++) {
    let relatedShoe = Math.floor(numRecordsToGenerate * Math.random());
    relatedShoeObj[relatedShoe] = relatedShoe;
  }
  return Object.values(relatedShoeObj);
};

for (let fileNumber = 0; fileNumber < numberOfSeparateFiles; fileNumber++) {
  const categoryString = "sku,product_name,price,category,thumbnail\n";
  try {
    fs.writeFileSync(
      `./csvdata/shoe_table/records${fileNumber}.csv`,
      categoryString
    );
    console.log("HEADERS ADDED");
  } catch (err) {
    console.log("THERE WAS AN ERROR WRITING HEADERS");
  }

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
      sku: currentSKU,
      product_name: faker.commerce.productName(),
      price: (150 * Math.random()).toFixed(2),
      category: faker.commerce.department(),
      thumbnail: faker.image.imageUrl()
    };

    let currentEntry = "";

    for (let key in shoe) {
      currentEntry += shoe[key];
      currentEntry += ",";
    }
    currentEntry = currentEntry.substr(0, currentEntry.length - 1); // remove last comma and replace it with a new line char
    currentEntry += "\n";

    try {
      fs.appendFileSync(
        `./csvdata/shoe_table/records${fileNumber}.csv`,
        currentEntry
      );
    } catch (err) {
      console.error(err);
    }
    currentSKU++;
  }
}
