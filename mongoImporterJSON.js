require("dotenv").config();

const { execSync } = require("child_process");

for (let i = 0; i < process.env.NUMFILES; i++) {
  // console.clear();
  execSync(
    `mongoimport -d ${process.env.DATABASENAME} -c ${
      process.env.COLLECTIONNAME
    } --type json --file ./jsondata/records-json${i}.json --jsonArray --maintainInsertionOrder`
  );
  console.log(`Current Importing Files ${i + 1} of ${process.env.NUMFILES}`);
}
