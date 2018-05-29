const mongoose = require("mongoose")
const Produto = require("../Models/produtoModel")

//Os if(err) são regras de negócio para evitar um erro do mongo no momento de executar o comando

exports.registrarProduto = function(req, res, next){
//Equivale ao create table em sql
    Produto.create({
        nome: req.body.nome,
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        marca: req.body.marca
    }, function(err, produtos){
        if(err)
            return res.status(500).send({
                message: "Erro ao criar produtp",
                erro:err
            })
        
        return res.status(200).send({
            message: "Produto criado com sucesso",
            Produto: produtos
        })
    })
}

//SELECT *
exports.getTodosProdutos = function(req, res, next) {
    var query = Produto.find()

    query.exec( function(err, produtos){
        if(err)
            return res.status(500).send({
                message: "Erro ao adquirir todos os produtos",
                erro: err
            })
        
        return res.status(200).json(produtos)
    })
}

//SELECT de algo específico
exports.getUmProduto = function(req, res, next){
    const _idProduto = req.params.id_produto

    Produto.findById(_idProduto, function(err, produtos){
        if(err)
            return res.status(500).send({
                message: "Erro ao adquirir todos os produtos",
                erro: err
            })
        
        return res.status(200).send(produtos)
    })
}

//DELETE
exports.deleteProduto = function(req, res, next){
    const _idProduto = req.params.id_produto

    Produto.findById(_idProduto, function(err) {
        if(err)
            return res.status(500).send({
                message: "Erro ao adquirir todos os produtos",
                erro: err
            })

        Produto.remove({_id: _idProduto}, function(err){
            if(err)
                return res.status(500).send({
                    message: "Erro ao adquirir todos os produtos",
                    erro: err
                })

                return res.status(200).send({message: "Produto excluído com sucesso"})        
        })
    })
}

//UPDATE
exports.alterarProduto = function(req, res, next) {
    const _idProduto = req.params.id_produto
    const _nome = req.body.nome
    const _valor = req.body.valor
    const _quantidade = req.body.quantidade
    const _marca = req.body.marca

    Produto.findById({_id: _idProduto}, function(err, produtos){
        if(err)
            return res.status(500).send({
                message: "Erro ao adquirir todos os produtos",
                erro: err
            })
        
        produtos.set({
            nome: _nome,
            quantidade: _quantidade,
            valor: _valor,
            marca: _marca
        })

        produtos.save(function(err, produtoAlterado){
            if(err)
                return res.status(500).send({
                    message: "Erro ao adquirir todos os produtos",
                    erro: err
                })

            return res.status(200).send({
                message: "Produto alterado com sucesso",
                Produto: produtoAlterado
            })

        })

    })
}