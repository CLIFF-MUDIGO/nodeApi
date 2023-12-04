const express = require("express");
const mongoose = require("mongoose");
const app = express();


//routes
app.get("/", (req, res) => {
    res.send("Hello NODE API")
})

app.get("/blog", (req, res) => {
    res.send("Hello blog")
})






mongoose.connect("mongodb+srv://cliff:cliff1@cluster0.oajb0lw.mongodb.net/node-api?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to mongoDB")
    app.listen(3000, () => {
        console.log("Node Api is running on port 3000")
    })
    
}).catch((err)=>{
    console.log(err)
})


