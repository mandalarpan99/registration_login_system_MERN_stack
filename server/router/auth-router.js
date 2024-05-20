const express = require("express");
const router = express.Router();
const controllersAuth  = require("../controllers/controllers");
const signup = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/').get(controllersAuth.home);
router.route('/register').post(validate(signup), controllersAuth.register);
router.route('/login').post(controllersAuth.login);
router.route('/user').get(authMiddleware, controllersAuth.user);
module.exports = router;