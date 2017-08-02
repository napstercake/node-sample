'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const Product = require('./models/product');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/product', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `No se pudo obtener la peticion: ${err}`});
        if (!products) return res.status(404).send({message: 'No existen productos'});

        res.send(200, {products: products});
    });
});

app.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `No se pudo obtener la peticion: ${err}`});
        if (!product) return res.status(404).send({message: 'El producto no existe'});
        
        res.status(200).send({product: product});
    });
});

app.post('/api/product', (req, res) => {
    console.log('POST api/product');
    console.log(req.body);

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
})

app.put('/api/product:productId', (req, res) => {
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar en la base de datos: ${err}`});
        res.status(200).send({product: productUpdated});
    });
});

app.delete('/api/product:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findById(productId, (err) => {
        if (err) res.status(500).send({message: `Error al borrar en la base de datos: ${err}`});
        product.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar en la base de datos: ${err}`});
            res.status(200).send({message: 'El producto ha sido eliminado'});
        });
    });
});

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
    if (err) throw err;
    console.log('conexion exitosa');

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`);
    });

});

