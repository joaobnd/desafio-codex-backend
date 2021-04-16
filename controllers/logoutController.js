const Blacklist = require('../models/blacklist');

exports.logout = async (req, res) => {
        const auth = req.headers.authorization

        if(!auth) {
            res.status(400).json({ error: 'sem token'})
        }

        const parts = auth.split(' ')

        if(!parts.length === 2) {
            res.status(400).json({ error: 'token errado'})
        }

        const token = parts[1]

        await Blacklist.create({ token });

        res.status(200).json({ message: 'logout efetuado'})
}