const express = require("express");
const router = express.Router();
const selectAllData = require('../controllers/admin-controller');

router.route('/users').get(selectAllData);

module.exports = router;