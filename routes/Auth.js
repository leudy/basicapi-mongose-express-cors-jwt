/**
 *  Ruta de usuarios
 *  host + '/api/auth'
 */

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { validateJWT } = require('../middlerwares/ValidateToken')
const { registerHandler, loginHandler, renewHandler } = require('../controllers/Auth/Auth');
const { ValidateFiels, LoginFields, RegisterFields } = require('../middlerwares/ValidateFiels');


// login an user
router.post('/login',
    [
        LoginFields
        , ValidateFiels
    ], loginHandler);

// register new user
router.post('/new', [
    RegisterFields
    , ValidateFiels
], registerHandler);


// renew token
router.patch('/renew', validateJWT, renewHandler);
module.exports = router;