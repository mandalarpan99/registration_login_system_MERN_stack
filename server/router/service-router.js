const express = require("express");
const Service = require("../controllers/service-controller");
const router = express.Router();


router.route('/service').get(Service);

module.exports = router;