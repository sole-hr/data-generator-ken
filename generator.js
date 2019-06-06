const faker = require("faker");
const skuGen = require("shortid");
const fs = require("fs");

const numRecordsToGenerate = 10000;

const generateRandomColorArray = upTo => {
  const numColors = Math.ceil(upTo * Math.random());
  const colors = {};
  for (let i = 0; i < numColors; i++) {
    let currentColor = faker.commerce.color();
    colors[currentColor] = currentColor;
  }
  const colorsArray = Object.keys(colors);
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

const categoryString = "sku,productName,category,color,price,images\n";
try {
  fs.writeFileSync("./records.csv", categoryString);
  console.log("HEADERS ADDED");
} catch (err) {
  console.log("THERE WAS AN ERROR WRITING HEADERS");
}

for (let entry = 0; entry < numRecordsToGenerate; entry++) {
  if (entry % 10 === 0) {
    // LOG PERCENTAGE COMPLETED, ONLY 1 OUT OF 10 ITERATIONS
    console.log(100 * (entry / numRecordsToGenerate) + "% COMPLETE");
  }
  let shoe = {
    sku: skuGen.generate() + "",
    productName: faker.commerce.productName(),
    category: faker.commerce.department(),
    color: generateRandomColorArray(20),
    price: (150 * Math.random()).toFixed(2),
    images: generateRandomImages(12)
  };

  let currentEntry = "";

  for (let key in shoe) {
    if (key === "color" || key === "images") {
      currentEntry += '"';
      for (let i = 0; i < shoe[key].length; i++) {
        currentEntry += shoe[key][i];
        if (i !== shoe[key].length - 1) {
          currentEntry += ",";
        }
      }
      currentEntry += '"';
    } else {
      currentEntry += shoe[key];
    }
    currentEntry += ",";
  }
  currentEntry = currentEntry.substr(0, currentEntry.length - 1); // remove last comma and replace it with a new line char
  currentEntry += "\n";
  // fs.appendFileSync("./records.csv", currentEntry, err => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //   }
  // });

  try {
    fs.appendFileSync("./records.csv", currentEntry);
    // console.log("HEADERS ADDED");
  } catch (err) {
    console.error(err);
  }
}

console.log();
