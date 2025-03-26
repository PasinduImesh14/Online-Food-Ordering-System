const mongoose = require("mongoose")

const monogodbUrl="mongodb+srv://pasinduimesh385:1nhNq4CJWj7VqkoE@cluster0.trtef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectDB() {
    return mongoose.connect(monogodbUrl)
}

module.exports = connectDB