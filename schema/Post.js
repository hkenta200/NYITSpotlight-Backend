const mongoose = require("mongoose");

//Schema includes general profile information + actionable requests like follow

const PostSchema = new mongoose.Schema({
        userId:{
            type: String,
            required: true,
        },
        desc:{
            type: String,
            max: 500
        },
        image:{
            type: String
        },
        likes:{
            type: Array,
            default: []
        },
        dislikes:{
            type: Array,
            default: []
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);