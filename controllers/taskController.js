const Task = require('../models/task');
const User = require('../models/user');


exports.createTask = async (req, res) => {
    try {

        const { name, property } = req.body;
        const { userId } = req.query;

        if(!userId) {
            res.status(400).json({ error: "sem id"})
        }

        const newTask = await Task.create({ name, property, user: userId});

        res.status(201).json({
            status: 'sucess',
            data: {
                task: newTask
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getAllTasks = async (req, res) => {
    try {

        const { property, userId } = req.query;
        let body = { 
            user: userId,
        }

        let tasks;


       /* if(property) {
            body = {
                ...body,
                property,
            }
        }*/

        if(property && property === 'true') {
            tasks = await Task.find(body).sort({ property: "asc"}).exec();
        } else {
            tasks = await Task.find(body);
        }
        
        res.status(200).json({
            status: 'sucess',
            data: {
                tasks
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateTask = async (req, res) => {
    try{
        const userId = req.params.userId;
        const task = await Task.findOne({user: userId, _id: req.params.id})

        if(!task) {
            res.status(400).json({error: 'usuario n tem permissao'})
        }

        const updateTask = await Task.findByIdAndUpdate(req.params.id,
        req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                task: updateTask
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const userId = req.params.userId;
        const task = await Task.findOne({user: userId, _id: req.params.id})

        if(!task) {
            res.status(400).json({error: 'usuario n tem permissao'})
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'deletado com sucesso'});
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
    
}
