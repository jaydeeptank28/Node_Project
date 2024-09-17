const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const resturantRoutes = require('./routes/resrurantRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const foodRoutes = require('./routes/foodRoutes')

//dot env configuration
dotenv.config();


//rest object 
const app = express();

//middlware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/resturant', resturantRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/food', foodRoutes);


app.get('/', (req, res) => {
    return res.status(200).send("Welcome to Food App")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})