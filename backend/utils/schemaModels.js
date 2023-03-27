
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const BookSchema = new Schema({
    title: String,
    author: String,
    image: String,
    pages: Number,
    status: Boolean,
    email: String
})

exports.UserModel = mongoose.model("User", UserSchema)
exports.BookModel = mongoose.model("Book", BookSchema)