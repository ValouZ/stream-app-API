const {Router} = require('express');
const router = Router();

const userController = require('../controllers/userController')

/**
 * /user GET
 */
router.get('/user', userController.userGet);

/**
 * /finduser POST
 * @description retrieve one user given info
 */
router.post('/finduser', userController.userGetOne)

/**
 * /user POST
 */
router.post('/user', userController.userPost);

module.exports = router;

