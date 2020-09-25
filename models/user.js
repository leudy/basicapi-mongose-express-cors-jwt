const { Schema, model } = require('mongoose')
const { StringType } = require('./types/StringRequired')
const UserSchema = Schema({
    name: StringType, email: { unique: true, ...StringType }, password: StringType
})

module.exports = model('users', UserSchema)