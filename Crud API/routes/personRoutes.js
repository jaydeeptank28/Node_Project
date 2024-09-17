const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

//POST route to add a person 
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        // Insert many persons into the database
        // const response = await Person.save(people);


        //Save the new person to the database
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Persons Data saved Successfully');


        //payload for jwt token
        const payLoad = {
            id: response.id,
            name: response.username
        }

        console.log(JSON.stringify(payLoad));
        const token = generateToken(payLoad);
        console.log('Token is :', token);


        res.status(200).json({ response: response, token: token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server Error' });
    }
});

//Login Route
router.post('/login', async (req, res) => {


    try {
        //extract username and password from request body
        const { username, password } = req.body;

        //find the user by username
        const user = await Person.findOne({ username: username });

        //If user does not exist or password does not match return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid Username or Password' });
        }

        //generate token
        const payload = {
            id: user.id,
            name: user.username
        }

        const token = generateToken(payload)

        //return token as response
        res.json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})



//GET method to get the person 
router.get('/', jwtAuthMiddleware, async (req, res) => {

    try {
        const data = await Person.find();
        console.log('Person Data fetched Succesfully');
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server Error' })
    }
})


//Profile Routes
router.get('/profile',jwtAuthMiddleware, async (req, res) => {

    try {
        const userData = req.user;
        console.log('userdata :', userData);

        const userid = userData.id;
        const user = await Person.findById(userid);
        res.status(200).json({ user });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Interanl server Error' })
    }

})



//paramitarized get method
router.get('/:worktype', async (req, res) => {

    try {
        const worktype = req.params.worktype; //extact the work type from the URL parameter

        if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {
            const response = await Person.find({ work: worktype })
            console.log('person worktype fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Work type' })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Interanl server Error' })
    }
})


router.put('/:id', async (req, res) => {

    try {
        const personId = req.params.id  //exteact the id from the URL parameter
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,              //Return the Updated document
            runValidators: true     //Run mongoose Validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not Found' })
        }

        console.log('Data Updated Succefully');
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interanl Server Error' })
    }

})

router.delete('/:id', async (req, res) => {

    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId)

        if (!response) {
            return res.status(404).json({ error: 'Person not Found' })
        }

        console.log('Data Deleted Succefully');
        res.status(200).json({ meassge: 'data deleted successfully' })

    } catch (error) {
        console.log(err);
        res.status(500).json({ error: 'Interanl Server Error' })
    }

})

module.exports = router;