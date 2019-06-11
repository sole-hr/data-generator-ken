//mongoimport -d sdc -c carousel --type csv --file records0.csv --headerline
require("dotenv").config();
const faker = require("faker");
const fs = require("fs");

const numShoesInDB = process.env.NUM_RECORDS; // 10M records
const numRelatedShoesPerProduct = process.env.NUM_REL_SHOES_PER_PRODUCT;
const numberOfSeparateFiles = process.env.NUM_FILES_SHOES;

// Iterate over  number of shoes in database
let id = 0;
let mainSKU = 0;
for (let currentFile = 0; currentFile < numberOfSeparateFiles; currentFile++) {
  let headers = "id,main_sku,related_sku\n";
  fs.writeFileSync(
    `./csvdata/related_shoe_table/records${currentFile}.csv`,
    headers
  );
  for (
    let currentSKU = 0;
    currentSKU < numShoesInDB / numberOfSeparateFiles;
    currentSKU++
  ) {
    for (
      let currentRelatedSKU = 0;
      currentRelatedSKU < numRelatedShoesPerProduct;
      currentRelatedSKU++
    ) {
      if (id % 1000 === 0) {
        console.clear();
        console.log(
          `FILE NUMBER ${currentFile} of ${numberOfSeparateFiles}: ${(100 *
            currentSKU) /
            (numShoesInDB / numberOfSeparateFiles)}%`
        );
      }
      let currentRow = `${id},${mainSKU},${Math.floor(
        numShoesInDB * Math.random()
      )}\n`;
      fs.appendFileSync(
        `./csvdata/related_shoe_table/records${currentFile}.csv`,
        currentRow
      );
      id++;
    }
    mainSKU++;
  }
}
