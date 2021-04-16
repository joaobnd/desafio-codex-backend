const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Blacklist = require('../models/blacklist');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId}, 'heypaulanamoracmg', { expiresIn: 86400});
}

//metodo para cadastrar usuario
exports.register = async (req, res) => {

    try {
        const user = await User.create(req.body)

        res.status(200).json({ user, token: createUserToken(user.id) })

    } catch (err) {
        res.status(400).json({ error: err.message})
    }
    
}

//metodo para fazer login
exports.login = async (req, res) => {
    const { email, password} = req.body;

    if(!email || !password) {
        res.status(400).json({ error: 'faltou dado'})
    }

    try {
        const user = await User.findOne({email, password})

        if(!user) {
            res.status(400).json({ error: 'n achei usuario'})
        }

        const pass_ok = await (password === user.password)

        if(!pass_ok) {
            res.status(400).json({ error: 'senha errada'})
        }
        const token = createUserToken(user.id)
        const validateToken = await Blacklist.findOne({ token })

        if(validateToken) {
            await Blacklist.remove({token})
        }

        res.status(200).json({user, token})
        
    } catch (err) {
        res.status(400).json({ error: err.message})
    }

}
