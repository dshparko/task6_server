const {Schema, model} = require("mongoose")

const Message = new Schema({
    sender: {type: String, required: true },
    recipient: {type: String, required: true},
    title: {type: String},
    content: {type: String}
})

module.exports = model('Message', Message)