const response = require('express')
const jsonWebToken = require('jsonwebtoken')
const validateJWT = (req, res = response, next) => {
    let token = req.header('x-token');
    const { headers } = req;
    if (headers.authorization) {
        if (!token) {
            console.log('asignare un barear')
            const barear = headers.authorization.split(' ')[1]
            token = barear;
        }
    }
    if (!token) {
        return res.status(400).json({ ok: false, msg: 'no se ha enviado un token' })
    }
    try {
        const { uid, name } = jsonWebToken.verify(token, process.env.SECRET_JSON_SEED)
        const result = jsonWebToken.verify(token, process.env.SECRET_JSON_SEED)
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({ ok: false, msg: 'Token no validao' })
    }
    next();
}


module.exports = { validateJWT }