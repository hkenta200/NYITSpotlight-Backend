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
    profilePicture:{
        type: String,
        default: ""
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