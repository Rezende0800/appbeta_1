const mongoose = require("mongoose")
//Modelo das "Tabelas do app"
var ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Informe o nome do produto"]
    },
    quantidade: {
        type: Number,
        required: [true, "Informe a quantidade do produto"]
    },
    valor: {
        type: Number,
        required: [true, "Informe o valor do produto"]
    },
    marca: {
        type: String,
        required: [true, "Informe a marca do produto"]
    }

}, {
    timestamps: true
})
// Produto equivale ao nome da tabela
module.exports = mongoose.model("Produto", ProdutoSchema)
