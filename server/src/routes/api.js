const express = require("express")
const ProdutoController = require("../Controllers/ProdutoController")

module.exports = function (app) {
    const produtoRoute = express.Router();
  
    app.use("/api", function(req, res){
        res.writeHead(200)
        res.end("API FUNCIONA")
    })

    //Como se fosse uma ponte
    app.use("/produto",
        produtoRoute.post("/", ProdutoController.registrarProduto),                 //Create        
        produtoRoute.get("/", ProdutoController.getTodosProdutos),                  //Selcet tudo
        produtoRoute.get("/:id_produto", ProdutoController.getUmProduto),           //Select um
        produtoRoute.delete("/:id_produto", ProdutoController.deleteProduto),       //Delete
        produtoRoute.put("/:id_produto", ProdutoController.alterarProduto)          //Update
    )
} 