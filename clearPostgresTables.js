require("dotenv").config();
const { execSync } = require("child_process");
const path = require("path");

// DELETE ALL RECORDS
execSync('psql -d sdc -c "DELETE FROM related_shoe"');
execSync('psql -d sdc -c "DELETE FROM shoe"');
