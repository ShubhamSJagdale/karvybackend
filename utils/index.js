const fs = require("fs");
const pathMod = require("path");

const getData = new Promise((resolve, reject) => {
  fs.readFile(
    pathMod.join(pathMod.resolve("./"), "assets", "data", "data.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(data);
    }
  );
});

exports.getData = getData;
