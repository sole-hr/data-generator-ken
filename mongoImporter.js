const { execSync } = require("child_process");

for (let i = 0; i < 10; i++) {
  // console.clear();
  execSync(
    `mongoimport -d sdc -c carousel --type csv --file ./10mrecords/records${i}.csv --headerline`
  );
  console.log(`Current Importing Files ${i + 1} of 10`);
}
