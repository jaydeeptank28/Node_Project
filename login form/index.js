const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const {collection,logpost,signpost }= require('./mongodb');
const { name } = require('ejs');

app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.render("home")
})
app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})


app.post('/signup',signpost)


app.post('/login',logpost)



app.listen(5000, () => {
    console.log("listen on 5000 port");
})