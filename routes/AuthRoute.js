const { Router } = require('express');
const { Register, Login, RegisterAdmin, LoginAdmin } = require('../controller/AuthController');
const { changeUser, changePassword, isAuthUser } = require('../controller/UserController');
const router = Router();

router.post('/register',Register);
router.post('/login',Login);
router.post('/admin/reg',RegisterAdmin);
router.post('/admin/log',LoginAdmin);
router.post('/change',isAuthUser,changeUser);
router.post('/change/pass',isAuthUser,changePassword)


module.exports = router;