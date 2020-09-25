/**
 *  Ruta de usuarios
 *  host + '/api/auth'
 */

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')

const { registerHandler, loginHandler, renewHandler } = require('../controllers/Auth/Auth');
const { ValidateFiels, LoginFields, RegisterFields } = require('../middlerwares/ValidateFiels');

const loginValidateFields =

    router.post('/login',
        [
            LoginFields
            , ValidateFiels
        ], loginHandler);


router.post('/new', [
    LoginFields
    , ValidateFiels
], RegisterFields);



router.patch('/renew', renewHandler);
module.exports = router;