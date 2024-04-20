// convert json to csv

const fs = require("fs");

// read json file
const json = require("./data.json");

// convert json to csv
const csv = json
  .map((row) => {
    return Object.values(row).join(",");
  })
  .join("\n");

// write csv file
fs.writeFileSync("data.csv", csv);
