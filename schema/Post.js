const mongoose = require("mongoose");

//Schema includes general profile information + actionable requests like follow

const PostSchema = new mongoose.Schema({
        userId:{
            type: String,
            required: true,
        },
        postId:{
            type: String,
        },
        postDate:{
            type: String,
        },
        desc:{
            type: String,
            max: 500
        },
        image:{
            type: String,
            default: null
        },
        likes:{
            type: Array,
            default: []
        },
        isLiked:{
            type: Boolean,
            default: false
        },
        dislikes:{
            type: Array,
            default: []
        },
        comments:{
            type: Array,
            default: []
        },
        numberOfComments:{
            type: Array,
            default: []
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);