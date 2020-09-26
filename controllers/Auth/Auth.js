const { response, json } = require('express')
const bccrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jsonwebtoken = require('../../helpers/jwt')
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
        let token = await jsonwebtoken.generarJwt(user._id, user.name)
        res.status(200).json({ ok: true, name: new_user.name, uid: new_user._id, token })
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
        if (isValid) {
            let token = await jsonwebtoken.generarJwt(user._id, user.name)
            return res.status(200).json({ ok: true, uuid: user._id, name: user.name, token })
        }
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
const renewHandler = async (req, res = response) => {
    const { uid, name } = req;
    let token = await jsonwebtoken.generarJwt(uid, name)
    res.json({ ok: true, msg: 'renew is succefull', uid, name, new_token: token })
}

module.exports = { registerHandler, loginHandler, renewHandler }