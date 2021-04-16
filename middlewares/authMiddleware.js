const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist');

//middleware de autenticacao para gerenciar os tokens
exports.authentication = async (req, res, next) => {
        const auth = req.headers.authorization

        if(!auth) {
            res.status(400).json({ error: 'sem token'})
        }

        const parts = auth.split(' ')

        if(!parts.length === 2) {
            res.status(400).json({ error: 'token errado'})
        }

        const [scheme, token] = parts

        if(!/^Bearer$/i.test(scheme)) {
            res.status(400).json({ error: 'token invalido'})
        }

        const verifyToken = await Blacklist.findOne({ token });

        if(verifyToken) {
            res.status(400).json({ error: "ta na lista negra"})
        }
        jwt.verify(token, 'heypaulanamoracmg', (err, decoded) => {
           
           if(err) {
            res.status(400).json({ error: 'token invalido'})
           }

           req.userId = decoded.id;

           return next();

        })



}