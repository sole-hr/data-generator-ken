//mongoimport -d sdc -c carousel --type csv --file records0.csv --headerline
require("dotenv").config();
const faker = require("faker");
const fs = require("fs");

const numShoesInDB = process.env.NUM_RECORDS; // 10M records
const numRelatedShoesPerProduct = process.env.NUM_REL_SHOES_PER_PRODUCT;
const numberOfSeparateFiles =
  process.env.NUM_FILES_SHOES * numRelatedShoesPerProduct;

let id = 0;
let currentSKU = 0;

const generateRandomSKUs = numRelated => {
  const relatedShoeObj = {};
  for (let i = 0; i < numRelated; i++) {
    let relatedShoe = Math.floor(numShoesInDB * Math.random());
    relatedShoeObj[relatedShoe] = relatedShoe;
  }
  return Object.values(relatedShoeObj);
};

for (let fileNumber = 0; fileNumber < numberOfSeparateFiles; fileNumber++) {
  const categoryString = "id,main_sku,related_sku\n";
  try {
    fs.writeFileSync(
      `./csvdata/related_shoe_table/records${fileNumber}.csv`,
      categoryString
    );
    console.log("HEADERS ADDED");
  } catch (err) {
    console.log("THERE WAS AN ERROR WRITING HEADERS");
  }

  for (let entry = 0; entry < numShoesInDB / numberOfSeparateFiles; entry++) {
    if (entry % 1000 === 0) {
      console.clear();
      console.log(
        `File Number: ${fileNumber + 1} of ${numberOfSeparateFiles}: ` +
          (100 * (entry / (numShoesInDB / numberOfSeparateFiles))).toFixed(0) +
          "%"
      );
    }

    for (let i = 0; i < numRelatedShoesPerProduct; i++) {
      let related_shoe = {
        id: id,
        main_sku: currentSKU,
        related_sku: Math.floor(numShoesInDB * Math.random())
      };

      let currentEntry = "";

      for (let key in related_shoe) {
        currentEntry += related_shoe[key];
        currentEntry += ",";
      }
      currentEntry = currentEntry.substr(0, currentEntry.length - 1); // remove last comma and replace it with a new line char
      currentEntry += "\n";
      try {
        fs.appendFileSync(
          `./csvdata/related_shoe_table/records${fileNumber}.csv`,
          currentEntry
        );
      } catch (err) {
        console.error(err);
      }
      id++;
    }
    currentSKU++;
  }
}
