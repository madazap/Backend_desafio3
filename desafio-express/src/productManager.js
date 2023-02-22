import fs from "fs";

class ProductManager {
  #path = "./products.json";

  constructor() {}

  async addProduct(title, description, price, thumbnail, code, stock) {
    contador = await this.contadorUnico();
    console.log(contador);
    const newProduct = {
      contador,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const products = await this.getProducts();

    const updProducts = [...products, newProduct];

    await fs.promises.writeFile(this.#path, JSON.stringify(updProducts));
  }

  async getProducts() {
    //mostrar todos los productos

    try {
      const products = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(products);
    } catch (e) {
      return [];
    }
  }

  async getProductsById(id) {
    console.log(id);
    try {
      const products = await this.getProducts();
      let prodB = products.filter((p) => p.contador === id);
      console.log(prodB);
    } catch (error) {
      console.error("El producto especificado no existe ");
    }
  }

  async updateProduct(id, nuevo_valor) {
    //tomar todos los productos
    //buscar que exista el id y campo, tratar de modificarlo
    try {
      const productsU = await this.getProducts();
      let prodU = productsU.findIndex((obj) => obj.contador == id);
      //no descubri como pasar el campo como argumento para modificar el campo unicamente no todo el objeto
      productsU[prodU].title = nuevo_valor;
      await fs.promises.unlink(this.#path);
      await fs.promises.writeFile(this.#path, JSON.stringify(productsU));
    } catch (error) {
      console.log("Ha ocurrido un error no se puede actualizar el producto");
    }
  }
  async deleteProduct(id) {
    //crear nuevo arreglo con los prodcutos excepto el del id enviado
    try {
      const products = await this.getProducts();
      let nuevosProd = products.filter((producto) => producto.contador != id);
      await fs.promises.unlink(this.#path);
      await fs.promises.writeFile(this.#path, JSON.stringify(nuevosProd));
    } catch (error) {
      console.log("Ha ocurrido un error no se puede borrar el producto");
    }
  }

  async contadorUnico() {
    let id_cont = Math.random().toString(20).substring(2);

    return id_cont;
  }
}

export default ProductManager;
