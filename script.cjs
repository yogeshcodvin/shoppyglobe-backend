



const mongoose = require("mongoose");
const User = require("./user.cjs");

mongoose.connect("mongodb://localhost:27017");

const newUser = User({

    name: "Yogesh",
    age : 23,
    isAdult : true,
    hobbies : ["swim", "dance"]
})

newUser.save().then((data)=>{
    console.log(data);
})
