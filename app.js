const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const {default : mongoose} = require("mongoose");

app.use(cors({origin : true}));
app.use(express.json());
/*
app.get("/",(req,res) => {
    return res.json("Hai there");
}) 

*/

//user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/", artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);


mongoose.connect(process.env.DB_STRING, {useNewUrlParser : true});
mongoose.connection
    .once("open",()=> console.log("connected"))
    .on("error", (error) => {
        console.log(`Error : ${error}`);
    })

app.listen(process.env.PORT || 4000,()=>{console.log("Listening to port 4000");});