
const mongoose = require("mongoose")

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://tenpen:tenpen@cluster0.vb1fhzd.mongodb.net/appDataBase?retryWrites=true&w=majority")
        console.log("Success: Connected to MongoDB")
    }catch(err){
        console.log("Failure: Unconnected to MongoDB")
        throw new Error()
    }
}

module.exports = connectDB