const fs = require("fs");

const getData = new Promise((resolve, reject) => {
  fs.readFile(
    `${process.env.BASEPATH}/assets/data/data.json`,
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
