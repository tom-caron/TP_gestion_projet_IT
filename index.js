const express = require('express')
const app = express()
const port = 3000

app.get('/Home', (req, res) => {
    res.sendFile(__dirname + "/views/home.html")
})

app.get('/script/:scriptName', (req, res) => {
    res.sendFile(__dirname + `/public/script/${req.params.scriptName}.js`)
})

app.get('/style/:styleName', (req, res) => {
    res.sendFile(__dirname + `/public/style/${req.params.styleName}.js`)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})