const router = require('express').Router();
const authMidlleware = require('../middleware/AuthMiddleware.js');
const adminMidlleware = require('../middleware/AdminMiddleware.js');
const userController = require('../controllers/UserController.js');


router.get('/',[authMidlleware,adminMidlleware],userController.getAllUserList);

router.post('/login', userController.loginAccount);

router.get('/me', authMidlleware, userController.myAccount);

router.patch('/me', authMidlleware, userController.updateAccount);

router.delete('/me',authMidlleware, userController.deleteAccount);

router.post('/', userController.addUser);

router.delete(':id',[authMidlleware,adminMidlleware],userController.deleteUser);

router.patch('/:id',[authMidlleware,adminMidlleware], userController.updateUserAccount);

router.get('/deleteAll', [authMidlleware,adminMidlleware],userController.deleteAllUsers);

module.exports = router;
