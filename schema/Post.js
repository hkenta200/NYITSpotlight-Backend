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
        likesCount:{
            type: String,
            default: "0"
        },
        isLiked:{
            type: Boolean,
            default: false
        },
        comments:{
            type: Array,
            default: []
        },
        commentsCount:{
            type: String,
            default: "0"
        },
        numberOfComments:{
            type: Array,
            default: []
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);