const { Schema, model, Types, SchemaTypes } = require('mongoose')
const { StringType } = require('./types/StringRequired')
const EventSchema = Schema({
    title: StringType,
    notes: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

EventSchema.method('toJSON', function () {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id
    return rest;
})

module.exports = model('Events', EventSchema)