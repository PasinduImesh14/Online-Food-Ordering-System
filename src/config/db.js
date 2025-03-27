const mongoose = require("mongoose")

const monogodbUrl="mongodb+srv://pasinduimesh385:VRffGMEQDyNZkAvv@cluster0.xoaults.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectDB() {
    return mongoose.connect(monogodbUrl)
}

module.exports = connectDB