const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A task must have a name.'],
        trim: true
    },
    property: {
        type: String,
        default: 'Baixa',
        enum: {values: ['Baixa', 'Alta'], message: 'A taks must be "Baixa" or "Alta"'},
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;