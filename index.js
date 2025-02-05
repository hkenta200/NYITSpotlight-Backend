const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./endpoints/users");
const authRoute = require("./endpoints/auth");
const contentRoute = require("./endpoints/content");
const conversationRoute = require("./endpoints/conversations");
const messageRoute = require("./endpoints/messages");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/content", contentRoute);
app.use('/conversations', conversationRoute);
app.use('/messages', messageRoute);


app.listen(8800, ()=>{
    console.log("Backend server is running!!!")
})
