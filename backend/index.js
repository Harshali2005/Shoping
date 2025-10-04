import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

import data from "./db.json" with { type: "json" }

app.get("/",(req,res)=>{
   res.redirect("/api/items");
});

app.get("/api/items",(req,res)=>{
    res.status(200).json(data);
});

app.get("/api/items/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const item = data.find((e1)=> e1.id === id);
    res.status(200).json(item);
});

app.post("/api/checkout", (req, res) => {
    const { cart, totalPrice } = req.body;
    if (!cart || !totalPrice) {
        return res.json({ error: "Invalid request body" });
    }
    console.log("Order received:", cart, totalPrice);
    res.json({ message: "Order placed successfully!" });
});

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})