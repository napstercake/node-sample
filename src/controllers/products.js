'use strict';

const Product = require('../models/product');

function getProduct(id) {
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `No se pudo obtener la peticion: ${err}`});
        if (!product) return res.status(404).send({message: 'El producto no existe'});
        
        res.status(200).send({product: product});
    });
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `No se pudo obtener la peticion: ${err}`});
        if (!products) return res.status(404).send({message: 'No existen productos'});

        res.send(200, {products: products});
    });
}

function saveProduct(req, res) {

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.descrip;

    product.save((err, productStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`});
        res.status(200).send({product: productStored});
    });
}

function updateProduct(id) {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar en la base de datos: ${err}`});
        res.status(200).send({product: productUpdated});
    });
}

function deleteProduct(id) {
    let productId = req.params.productId;
    Product.findById(productId, (err) => {
        if (err) res.status(500).send({message: `Error al borrar en la base de datos: ${err}`});
        product.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar en la base de datos: ${err}`});
            res.status(200).send({message: 'El producto ha sido eliminado'});
        });
    });
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}