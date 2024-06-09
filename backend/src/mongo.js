const mongoose=require("mongoose");

const URI = "mongodb+srv://kanishkvanza1046:BbaFGOBFDKSCg8dZ@cluster0.dl5hark.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async ()=> {
    try{
        await mongoose.connect(URI);
        console.log("Database Connected");
    }
    catch{
        console.log("Database Connection Failed");
    }
}
module.exports = connectDB; 