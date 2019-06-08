const { execSync } = require("child_process");

for (let i = 0; i < 10; i++) {
  // console.clear();
  execSync(
    `mongoimport -d sdc -c carouseljson --type json --file ./jsondata/records-json${i}.json --jsonArray`
  );
  console.log(`Current Importing Files ${i + 1} of 10`);
}
