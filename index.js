import express from "express"
import __dirname from "node:path"
const app = express()
const port = 3000

//File routes
app.get('/script/:scriptName', (req, res) => {
    console.log(__dirname + `/public/script/${req.params.scriptName}.js`)
    //res.sendFile(__dirname + `/public/script/${req.params.scriptName}.js`)
})

app.get('/style/:styleName', (req, res) => {
    res.sendFile(__dirname + `/public/style/${req.params.styleName}.js`)
})

//View routes
app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/views/home.html")
})

//Start
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})