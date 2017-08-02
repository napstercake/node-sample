'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
    if (err) throw err;
    console.log('conexion exitosa');

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`);
    });

});

