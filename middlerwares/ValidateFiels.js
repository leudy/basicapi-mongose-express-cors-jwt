const { response } = require('express')
const { validationResult, check } = require('express-validator')


const RegisterFields =
    [check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatoria').not().isEmpty()
        , check('password', 'la contraseña debe de tener un minimo de 6 digito').not().isEmpty().isLength({ min: 6 })]
const LoginFields =
    [
        check('email', 'el email es obligatorio').not().isEmpty(),
        check('password', 'la contraseña es obligatoria').not().isEmpty()
        , check('password', 'la contraseña debe de tener un minimo de 6 digito').not().isEmpty().isLength({ min: 6 })]



const ValidateFiels = (req, res = response, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.mapped() })
    }
    next();
}


module.exports = { ValidateFiels, LoginFields, RegisterFields }