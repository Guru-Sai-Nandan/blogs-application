const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
const cors = require('cors')
const path = require('path')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('successful connection')
    }
    catch (err) {
        console.log(err)
    }
}

dotenv.config()
app.use(cors({ origin: ["http://localhost:3004"], credentials: true, optionsSuccessStatus: 200, }))
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('/images', express.static(path.join(__dirname, "images")))

// uploading images
const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        fn(null, "images")
    },
    filename: (req, file, fn) => {
        fn(null, req.body.img)
    }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("Image has been Uploaded Succesfully")
})

app.listen(process.env.PORT, () => {
    connectDB()
    console.log('running on port ' + process.env.PORT)
})



