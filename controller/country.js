const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.env.BASEPATH}/assets/images`);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg  format allowed!"));
    }
  },
}).single("image");
const { getData } = require("../utils");

//Middleware
exports.getCountryIdMiddleware = (req, res, next, id) => {
  req.Id = id;
  next();
};

exports.getAllCountrys = (req, res) => {
  getData
    .then((dataRes) => {
      let countries = JSON.parse(dataRes).countries?.map((item) => {
        return { Id: item.rank, name: item.name };
      });
      res.json(countries);
    })
    .catch((err) => {
      return res.status(500).json({ errMsg: err.toString() });
    });
};

exports.getCountry = (req, res) => {
  getData
    .then((dataRes) => {
      let country = JSON.parse(dataRes).countries?.filter(
        (item) => item.rank == req?.Id
      );
      res.json(country[0]);
    })
    .catch((err) => res.status(500).json({ errMsg: err.toString() }));
};

exports.getCountryImage = (req, res) => {
  getData.then((dataRes) => {
    let path = JSON.parse(dataRes).countries.filter(
      (item) => item.rank == req.Id
    );

    fs.readFile(
      `${process.env.BASEPATH}/assets/${path[0].flag}`,
      (err, img) => {
        if (err) {
          res.status(500).send({ msg: err });
          return;
        }
        res.set("Content-Type", "image/png");
        res.send(img);
      }
    );
  });
};

exports.getContinent = (req, res) => {
  getData
    .then((dataRes) => {
      let continent = Object.keys(
        JSON.parse(dataRes).countries.reduce(
          (r, { continent }) => ((r[continent] = ""), r),
          {}
        )
      );
      res.json(continent);
    })
    .catch((err) => {
      return res.status(500).json({ errMsg: err.toString() });
    });
};

exports.createCountry = (req, res) => {
  console.log(req.body);
  getData
    .then((dataRes) => {
      let countryInfo = JSON.parse(dataRes);
       
        countryInfo.countries = [...countryInfo.countries, req.body];
        fs.writeFile(
          `${process.env.BASEPATH}/assets/data/data.json`,
          JSON.stringify(countryInfo),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      
      res.json({ hasError: false, msg: "Create country successful" });
    })
    .catch((err) => res.status(500).json({ errMsg: err.toString() }));
};

exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send({ hasError: true, errMsg: err.toString() });
    }
    res.send({
      hasError: false,
      filename: req?.file?.originalname,
      message: "File is uploaded successfully!",
    });
  });
};
