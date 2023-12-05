const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/productModel")


app.use(express.json());
//routes
app.get("/", (req, res) => {
    res.send("Hello NODE API")
})

app.get("/blog", (req, res) => {
    res.send("Hello blog")
})

app.get("/product", async(req, res)=> {
    try {
        const products = await Product.find();
        res.status(200).json(products);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})
app.get("/product/:id", async(req, res)=> {
    try {
        const{id} = req.params
        const products = await Product.findById(id);
     
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.post("/product", async(req, res)=> {
    try{
        const newProduct = await Product.create(req.body)
        res.status(200).json(newProduct);

    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message})
    }
})

//update a product
app.put("/product/:id", async(req, res)=> {
    try {
        const{id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find product with id ${id}`})
        }
        
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://cliff:cliff1@cluster0.oajb0lw.mongodb.net/node-api?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to mongoDB")
    app.listen(3000, () => {
        console.log("Node Api is running on port 3000")
    })
    
}).catch((err)=>{
    console.log(err)
})


