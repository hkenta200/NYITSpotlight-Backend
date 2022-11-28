const router = require("express").Router();
const Post = require("../schema/Post");

//Add post
router.post("/post", async (req, res)=>{
    const post = new Post({
      desc:req.body.message,
      userId:req.body.userId
  });
    try{
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});

//Get post
//This :id is the post id, not userId
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
});

//Get all Posts for feed
router.get("/feed/all", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const followingPosts = await Promise.all(
        currentUser.following.map((followingId) => {
          return Post.find({ userId: followingId });
        })
      );
      res.status(200).json(userPosts.concat(...followingPosts));
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Update post
//This :id is the post id, not userId
router.put("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({ $set: req.body });
            res.status(200).json("This post has been updated")
        }else{
            res.status(404).json("You can update only your own posts");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete post
//This :id is the post id, not userId
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("Post is now deleted");
      } else {
        res.status(404).json("You can delete only YOUR OWN post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Like Post
//This :id is the post id, not userId
router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("You liked this post");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("You disliked this post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;