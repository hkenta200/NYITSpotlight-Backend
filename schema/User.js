const mongoose = require("mongoose");

//Schema includes general profile information + actionable requests like follow

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    sex:{
        type: String,
        min: 6,
        default: "Male",
    },
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    from:{
        type: String,
        max: 50
    },
    major:{
        type: String,
        max: 50 
    },
    campus:{
        type: String,
        max: 50
    },
    year:{
        type: String,
        max: 50
    },
    NYITID:{
        type: String,
        min: 6,
        max: 10
    },
    profilePicture:{
        type: String,
        default: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
    },
    coverPicture:{
        type: String, 
        default: ""
    },
    followers:{
        type: Array,
        default: []
    },
    following:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    }, 
    desc:{
        type: String,
        max: 50
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);