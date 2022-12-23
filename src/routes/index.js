import express from "express";
import amostras from './amostrasRoute.js';
import usuarios from './usuariosRoute.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({message: 'Deverá ser redirecionado para pagina principal'})
    });

    app.use(
        express.json(),
        amostras,
        usuarios
    );
}

export default routes;