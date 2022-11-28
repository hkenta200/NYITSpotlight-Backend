const router = require("express").Router();
const User = require("../schema/User");

//Register a new user
router.post("/registerUser", async (req, res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        sex:req.body.sex,
        NYITID:req.body.NYITID,
        year:req.body.year,
        campus:req.body.campus,
    });

    try{
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }

});

//Login existing user
router.post("/loginUser", async (req, res)=>{
    try{
    
    //user exists 
    const user = await User.findOne({email:req.body.email});
    if(!user){
        res.status(404).json("User does not exist");
        return;
    }
    
    //password is matching 
    let validPassword = false;
    if(req.body.password == user.password){
        validPassword = true;
    }
    if(!validPassword){
        res.status(400).json("Wrong password")
        return;
    }

    //login user
    if(validPassword){
        res.status(200).json(user);
    }

    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router