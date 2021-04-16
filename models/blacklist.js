const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

const Blacklist = mongoose.model('Blaklist', blacklistSchema);

module.exports = Blacklist;