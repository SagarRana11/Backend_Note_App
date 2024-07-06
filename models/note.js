require('dotenv').config()
const mongoose = require('mongoose')
// mongoose.set("strickQuery", false)
const url = process.env.MONGODB_URL
console.log("Connecting to", url)

mongoose.connect(url)
    .then(() => {
        console.log("connected to database")
    })
    .catch((error) => {
        console.log(error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)