const { Router } = require('express')
const app = Router();
const { validateJWT } = require('../middlerwares/ValidateToken')
const { deleteEvent, addEvent, updateEvent, getById } = require('../controllers/EnventHandlerController');
const { isDate } = require('../helpers/isDate');
const { check, validationResult } = require('express-validator');
const { ValidateFiels } = require('../middlerwares/ValidateFiels')
// this line validate the entire router for jwt validation
app.use(validateJWT);
//add
app.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio el obligatoria').not().isEmpty(),
        check('start', 'La fecha de inicio el obligatoria').custom(isDate)
        , ValidateFiels
    ],
    addEvent)
// get by user
app.get('/', getById)
// edit
app.put('/:id', updateEvent)
// delete
app.delete('/:id', deleteEvent)


module.exports = app