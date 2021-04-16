const express = require('express');

const authRouter = require('./routes/authRouter');
const taskRouter = require('./routes/taskRouter');
const logoutRouter = require('./routes/logoutRouter');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());

//rota publica
app.use('/auth', authRouter);

//abaixo disso so os usuarios logados podem ter acesso
app.use(authMiddleware.authentication);

//rota privada
app.use('/tasks', taskRouter);
app.use('/logout', logoutRouter);

module.exports = app;