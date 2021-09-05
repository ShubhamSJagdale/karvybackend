const express = require("express");
const router = express.Router();
const {
  getAllCountrys,
  getCountry,
  getCountryIdMiddleware,
  getCountryImage,
  uploadImage,
  getContinent,
  createCountry,
} = require("../controller/country");

router.param("countryId", getCountryIdMiddleware);

router.get("/country/:countryId", getCountry);
router.get("/countries", getAllCountrys);
router.post("/createcountry", createCountry);
router.get("/getcontiment", getContinent);
router.get("/getImage/:countryId", getCountryImage);
router.post("/uploadImage", uploadImage);

module.exports = router;
