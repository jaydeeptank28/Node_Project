const express = require('express')
const app = express()
const db = require('./db');
const bodyparser = require('body-parser');
app.use(bodyparser.json())  //req.body
const passport = require('./auth');
require('dotenv').config();
const upload = require('./multer');

//Middleware Function
// const logRequest = (req, res, next) => {
//     console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
//     next();     //move on to the next phase 
// }
// app.use(logRequest);

app.set('view engine', 'ejs')





app.use(passport.initialize());

const localAuth = passport.authenticate('local', { session: false });
app.get('/', (req, res) => {
    res.send("Welcome to Our Hotel")
})

app.get('/form', (req, res) => {
    res.render("form")
})

app.post('/form',upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send('uploaded')
})


//import routes files
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


app.listen(4000, () => {
    console.log('Listening to 4000 port');
})

