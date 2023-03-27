
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const jwt = require("jsonwebtoken")
const auth = require("./utils/auth")
const connectDB = require("./utils/database")
const { UserModel, BookModel } = require("./utils/schemaModels")


// ITEM functions
// Create Item
app.post("/item/create", auth, async(req, res) => {
    try{
        await connectDB()
        await BookModel.create(req.body)
        return res.status(200).json({message: "アイテム作成成功"})
    }catch(err){
        return res.status(400).json({message: "アイテム作成失敗"})
    }
})

// Read All Items
app.get("/item/all", async(req, res) => {
    try{
        await connectDB()
        const allItems = await BookModel.find()
        return res.status(200).json({message: "アイテム読み取り成功(all)", allItems: allItems})
    }catch(err){
        return res.status(400).json({message: "アイテム読み取り失敗(all)"})
    }
})

// Read Single Item
app.get("/item/single/:id", async(req, res) => {
    try{
        await connectDB()
        const singleItem = await BookModel.findById(req.params.id)
        return res.status(200).json({message: "アイテム読み取り成功(single)", singleItem: singleItem})
    }catch(err){
        return res.status(400).json({message: "アイテム読み取り失敗(single)"})
    }
})

// Read Unread Books
app.get("/item/unread", async(req, res) => {
    try{
        await connectDB()
        const unreadItems = await BookModel.find({status: false})
        return res.status(200).json({message: "アイテム読み取り成功(unread)", unreadItems: unreadItems})
    }catch(err){
        return res.status(400).json({message: "アイテム読み取り失敗(unread)"})
    }
})

// Read Finished Books
app.get("/item/finished", async(req, res) => {
    try{
        await connectDB()
        const finishedItems = await BookModel.find({status: true})
        return res.status(200).json({message: "アイテム読み取り成功(finished)", finishedItems: finishedItems})
    }catch(err){
        return res.status(400).json({message: "アイテム読み取り失敗(finished)"})
    }
})

// Update Item
app.put("/item/update/:id", auth, async(req, res) => {
    try{
        await connectDB()
        const singleItem = await BookModel.findById(req.params.id)
        if(singleItem.email === req.body.email){
            await BookModel.updateOne({_id: req.params.id}, req.body)
            return res.status(200).json({message: "アイテム編集成功"})
        }else{
            throw new Error()
        }
    }catch(err){
        return res.status(400).json({message: "アイテム編集失敗"})
    }
})

// Delete Item
app.delete("/item/delete/:id", auth, async(req, res) => {
    try{
        await connectDB()
        const singleItem = await BookModel.findById(req.params.id)
        if(singleItem.email === req.body.email){
            await BookModel.deleteOne({_id: req.params.id})
            return res.status(200).json({message: "アイテム削除成功"})
        }else{
            throw new Error()
        }
    }catch(err){
        return res.status(400).json({message: "アイテム削除失敗"})
    }
})

// USER functions
// Register User
app.post("/user/register", async(req, res) => {
    try{
        await connectDB() 
        await UserModel.create(req.body)
        return res.status(200).json({message: "ユーザー登録成功"})
    }catch(err){
        return res.status(400).json({message: "ユーザー登録失敗"})
    }
})

// Login User
const secret_key = "tundoku-tower"
app.post("/user/login", async(req, res) => {
    try{
        await connectDB()
        const savedUserData = await UserModel.findOne({email: req.body.email})
        if(savedUserData){
            if(req.body.password === savedUserData.password){
                const payload = {
                    email: req.body.email,
                }
                const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
                return res.status(200).json({message: "ログイン成功", token: token})
            }else{
                return res.status(400).json({message: "ログイン失敗：パスワードが間違っています"})
            }
        }else{
            return res.status(400).json({message: "ログイン失敗：ユーザー登録してください"})
        }
    }catch(err){
        return res.status(400).json({message: "ログイン失敗"})
    }
})

// Connecting to port 
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on localhost port ${port}`)
})