const moment = require('moment')
const isDate = (value) => {
    if (!isDate) return false;
    return moment(value).isValid()
}

module.exports = { isDate }
