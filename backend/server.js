const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('./src/user-model');
const User = mongoose.model("user");
const connectDB = require('./src/mongo');
const bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.json())

app.post('/getDetails', async(req, res) => {
    User.find({ id : req.body.id })
    .then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        console.log(err);
    })
});

app.post('/check-id', async (req, res) => {
    try{
        const {id} = req.body;
        const userExist = await User.findOne({ id });
        console.log(userExist);
        if(userExist)
            return res.json({message: "User exists"});
        return res.json({message: "User doesn't exists"});

    }
    catch{
        console.log("User Doesn't exists")
    }
})

app.post('/sendGuestDetails',(req,res) =>{
    console.log(req.body.id);
    User.findOneAndUpdate({ id: req.body.id }, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
    }, {new: true}).then(text => {
        console.log(text);
        res.send(text);
    }).catch(err => {
        console.log("error", err);
    });
})

app.post('/sendGuestIDDetails',(req,res) =>{
    console.log(req.body.id);
    User.findOneAndUpdate({ id: req.body.id }, {
        idType: req.body.idType,
        idNumber: req.body.idNumber,
        idDate: req.body.idDate,
    }, {new: true}).then(text => {
        console.log(text);
        res.send(text);
    }).catch(err => {
        console.log("error", err);
    });
})

app.post('/sendRoomDetails',(req,res) =>{
    console.log(req.body.id);
    User.findOneAndUpdate({ id: req.body.id }, {
        roomType: req.body.roomType,
    }, {new: true}).then(text => {
        console.log(text);
        res.send(text);
    }).catch(err => {
        console.log("error", err);
    });
})

connectDB().then(() => {
    app.listen(3001, () =>{ 
        console.log(`Server running on port 3001`)
    })
});