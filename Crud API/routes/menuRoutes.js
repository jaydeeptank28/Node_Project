const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItems');



//POST route to add a menuitem 
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log(" Menu data added succesfully");
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server Error" });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("fetched succesfully");
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server Error" });
    }
})

router.get('/:taste', async (req, res) => {

    try {
        const taste = req.params.taste;
        if (taste == 'sweet' || taste == 'spicy' || taste == 'sour') {
            const response = await MenuItem.find({ Taste: taste })
            console.log('taste menu fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid taste' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})


router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const menuUpdateData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, menuUpdateData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: 'Menu not Found' })
        }
        console.log('Data Updated succesfully');
        res.status(200).json(response)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interanal Server Error' })
    }
})


router.delete('/:id', async (req, res) => {

    try {
        const menuId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuId)

        if (!response) {
            return res.status(404).json({ error: 'Menu not Found' })
        }

        console.log('Data Deleted succesfully');
        res.status(200).json({ meassge: 'Data deleted Successfully' })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interanal Server Error' })
    }

})

module.exports = router;