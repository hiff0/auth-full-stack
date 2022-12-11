const Router = require('express').Router;
const UserController = require('../controllers/userController');
const router = new Router();

router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);
router.post('/logout', UserController.logout);
router.get('/activete/:link', UserController.active);
router.get('/refresh', UserController.refresh);
router.get('/users', UserController.getUsers);

module.exports = router;