const fs = require("fs");

const file = fs.readFileSync("./records0.csv", "utf8");
const rows = file.split("\n");
const categories = rows[0].split(",");

const jsonObj = [];
console.log(categories);
// for (let currentRow = 1; currentRow < rows.length; currentRow++) {
let currentData = rows[1].split('"');
console.log(currentData);
// }
