const { response } = require('express')
const bccrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const UserContext = require('../../models/user')
const { findOne } = require('../../models/user')

const EncryptPasswordAsync = async (password) => {
    console.log('encriptacion iniciada')
    if (password) {

        const salt = bccrypt.genSaltSync();
        const _password = bccrypt.hashSync(password, salt);
        console.log('encriptacion retornada')
        return _password

    } else {
        return "no password asinged"
    }

}

const registerHandler = async (req, res = response) => {
    try {
        let user = req.body;
        const email = user.email;
        const exist = await UserContext.findOne({ email });
        if (exist) {
            return res.status(400).json({ ok: false, msg: 'Ya existe un cuenta con este correo' })
        }
        user.password = await EncryptPasswordAsync(user.password);
        console.log(user.password)
        const new_user = new UserContext(user);
        await new_user.save();

        res.status(200).json({ ok: true, msg: 'register  is succefull' })
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al intentar crear una cuenta de usuario, puede ser que el correo ya este en uso' })
    }
}



const loginHandler = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const user = await UserContext.findOne({ email });
        if (!user) {
            return res.status(400).json({ ok: false, msg: 'Este usuario no existe' })
        }
        const isValid = bccrypt.compareSync(password, user.password);
        if (isValid)
            return res.status(200).json({ ok: true, uuid: user._id, name: user.name })
        else
            return res.status(400).json({ ok: false, msg: 'Errro de credenciales' })

    } catch (error) {
        if (error) {
            console.log(error);

            return res.status(500).json({ ok: false, msg: 'Erorr en la operacion de base de datos' })
        }
    }
}

//TODO: regnew
const renewHandler = (req, res = response) => {
    res.json({ ok: true, msg: 'renew is succefull' })
}

module.exports = { registerHandler, loginHandler, renewHandler }