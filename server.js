const express = require("express")
const app = express()
const userRouter = require("./router/userRouter")
const bodyParser = require('body-parser');
const multer = require("multer");
// const jwt = require('jsonwebtoken');


const { connection } = require("./database/db")

require("./database/db")
const port = 8000;
app.use(bodyParser.json());

; (async () => await connection())()

app.use("/api", userRouter)
app.use(express.json())

// app.use(express.urlencoded({extended:true}))
app.listen(port, () => {
    console.log(`server running at ${port}`)
})