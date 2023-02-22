import express from "express";
import ProductManager from "./productManager.js";

const producto = new ProductManager();
let contador;
const app=express();


app.get("/products", async (req, resp )=>{
    const prods=  await producto.getProducts();
    const {limit}=req.query;
        if(limit){
            return resp.send(prods.slice(0,limit));
        }else{
            resp.send(prods);
        }
    
});

app.get("/products/:id", async (req, resp) => {
  const prods = await producto.getProducts();
  const { id } = req.params;

  if (id) {
    const producto =prods.find((i)=>i.contador==id);
        if(producto){
                return resp.send(producto);
        }
            else{
               resp.send(`El producto con codigo ${id} no existe`); 
            }
    
  } else {
    resp.send(`El producto no existe`);
  }
});

app.listen(8080, ()=> {
    console.log("Server listening on port 8080");
});

