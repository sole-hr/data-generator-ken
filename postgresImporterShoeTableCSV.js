require("dotenv").config();
const { execSync } = require("child_process");
const path = require("path");

// DELETE ALL RECORDS
execSync('psql -d sdc -c "DELETE FROM shoe"');

for (let i = 0; i < process.env.NUM_FILES_SHOES; i++) {
  execSync(
    `psql -d sdc -c "\copy shoe FROM '${__dirname}/csvdata/shoe_table/records${i}.csv' delimiter ',' csv header"`
  );
  console.log(
    `Current Importing Files ${i + 1} of ${process.env.NUM_FILES_SHOES}`
  );
}

// psql -d sdc -c "DELETE FROM shoe"
