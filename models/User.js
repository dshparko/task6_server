const {Schema, model, ObjectId} = require("mongoose")

const User = new Schema({
    name: {type: String, required: true }
})

module.exports = model('User', User)