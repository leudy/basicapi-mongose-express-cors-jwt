const { response } = require('express')
const EventContext = require('../models/event')


const getById = async (req, resp) => {
    const { uid } = req;
    const eventos = await EventContext.find({ user: uid }).populate('user', 'name');
    resp.status(200).json({ ok: true, eventos })
};

const addEvent = async (req, resp = response) => {
    const _event = new EventContext(req.body)
    _event.user = req.uid
    try {
        const eventeSaved = await _event.save()
        return resp.status(200).json({ ok: true, eventeSaved })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ msg: "no se pudo guardar el regsitro" })

    }
};
const updateEvent = async (req, resp = response) => {
    const id = req.params.id
    if (id.length !== 24)
        return resp.json({ ok: false, msg: 'el id suministrado no es valido' })
    const evento_id = req.params.id;
    const event = await EventContext.findById(evento_id)
    if (!event) {
        return resp.status(500).json({ ok: false, msg: 'no existe un evento con este id' })
    }
    const user_note = req.body.user;
    if (user_note !== req.uid) {
        return resp.status(400).json({ ok: false, msg: 'Usted no puede modificar esta nota' })
    }
    else {
        try {
            const new_event = {
                ...req.body,
                user: req.uid
            }
            const eventUpdated = await EventContext.findByIdAndUpdate(id, new_event, { new: true })
            return resp.status(200).json({ ok: true, eventUpdated })
        } catch (error) {
            console.log('error')
            return resp.status(400).json({ ok: false, msg: ' error al consultar la db' })
        }
    }
};


const deleteEvent = async (req, resp = response) => {
    const id = req.params.id;
    const event = await EventContext.findById(id);
    if (!event) return resp.status(400).json({ ok: false, msg: 'No existe un evento con este id' })
    const { uid } = req;
    const { user } = event;
    console.log(uid, user)
    if (uid == user) {
        console.log('es el mismo propietario')
        await EventContext.findByIdAndDelete(id);
        return resp.status(200).json({ ok: true, msg: 'delete by id is working' })
    } else {
        return resp.status(200).json({ ok: false, msg: 'no puedes eliminar  fuker este evento, no es de su pertenecnia' })
    }

}
module.exports = {
    getById, addEvent, updateEvent,
    deleteEvent
}


