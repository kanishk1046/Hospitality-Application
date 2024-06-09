const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    phone: String,
    dob: String,
    idType: String,
    idNumber: String,
    idDate: String,
    roomType: String
});


mongoose.model("user", userSchema);
