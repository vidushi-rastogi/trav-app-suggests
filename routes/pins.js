const router = require("express").Router();
const Pin = require("../models/Pin");

//create a pin down
router.post("/", async (req, res) => {
    //get all data from Pins model
    const newPin = new Pin(req.body);

    try {
        const saveNewPin = await newPin.save();  //store pin in table
        res.status(200).json(saveNewPin);  //send 200 (OK) status with new pin as response
    }
    catch (err) {
        res.status(500).json(err);  //error response
    }
});

//fetch all pin downs
router.get("/", async (req, res) => {
    try {
        const pins = await Pin.find();  //find all pins
        res.status(200).json(pins);   //send all pins as response
    }
    catch (err) {
        res.status(500).json(err);
    }
 
})

//delete specific pin
router.delete("/pin", async (req, res) => {
    try {
        const pin = await Pin.deleteOne({_id: req.query.id});  //delete one pin
        res.status(200).json(pin);   
    }
    catch (err) {
        res.status(500).json(err);
    }
 
})

//update specific pin
router.put("/pin", async (req, res) => {
    try {
        const pin = await Pin.updateOne({_id: req.query.id}, {title: req.body.title, desc: req.body.desc, rating: req.body.rating});  //update one pin
        res.status(200).json(pin);   
    }
    catch (err) {
        res.status(500).json(err);
    }
 
})


module.exports = router;