import express from "express";
import amostras from './amostrasRoute.js';
import usuarios from './usuariosRoute.js';
import admin from './adminRoute.js';
import picture from "./pictureRoute.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({message: 'Deverá ser redirecionado para pagina principal'})
    });

    app.use(
        express.json(),
        amostras,
        usuarios,
        admin,
        picture
    );
}

export default routes;