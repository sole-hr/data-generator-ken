require("dotenv").config();
const { execSync } = require("child_process");
const path = require("path");

const numFiles =
  process.env.NUM_FILES_SHOES * process.env.NUM_REL_SHOES_PER_PRODUCT;
// DELETE ALL RECORDS
execSync('psql -d sdc -c "DELETE FROM related_shoe"');

for (let i = 0; i < numFiles; i++) {
  execSync(
    `psql -d sdc -c "\copy related_shoe FROM '${__dirname}/csvdata/related_shoe_table/records${i}.csv' delimiter ',' csv header"`
  );
  console.log(`Current Importing Files ${i + 1} of ${numFiles}`);
}

// psql -d sdc -c "DELETE FROM shoe"
