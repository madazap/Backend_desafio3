import express from "express";
import ProductManager from "./productManager.js";

const producto = new ProductManager();
let products = [];
let contador;
const app=express();


app.get("/products", async (req, resp )=>{
    const prods=  await producto.getProducts();
    resp.send(prods);
});



app.listen(8080, ()=> {
    console.log("Server listening on port 8080");
});

