const mongoose = require('mongoose')

//lista negra onde os tokens desativados sao enviados para gerenciar a autenticaçao
const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

const Blacklist = mongoose.model('Blaklist', blacklistSchema);

module.exports = Blacklist;