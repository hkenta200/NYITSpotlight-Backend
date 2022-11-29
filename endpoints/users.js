const User = require("../schema/User");
const router = require("express").Router();


//update user
router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            return res.status(200).json("Account has been updated");
        } catch(err){
            return res.status(500).json("err 500");
        }
    }else{
        return res.status(403).json("You can update YOUR account");
    }
});

//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only YOUR account!");
    }
  });

//get user
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//follow user
router.put("/:id/followUser", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.following.includes(req.body.userId)) {
        await user.updateOne({ $push: { following: req.body.userId } });
        await currentUser.updateOne({ $push: { followers: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you currently follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannnot follow yourself");
  }
});

//unfollow user
router.put("/:id/unfollowUser", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.deleteOne({ $pull: { followers: req.body.userId } });
        await currentUser.deleteOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

//test endpoint
router.get("/", (req, res)=>{
    res.send("Hey its the user route!")
})

module.exports = router