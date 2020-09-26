const jwt = require('jsonwebtoken')
const generarJwt = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name }
        jwt.sign(payload, process.env.SECRET_JSON_SEED, { expiresIn: '48h' }, (err, token) => {
            if (err) {
                reject('Error genering token')
            } else {
                resolve(token)
            }

        })
    });
}
module.exports = { generarJwt };