const mongoose = require('mongoose')
const app = require('./app')
const port = 3003
mongoose.connect('mongodb+srv://develop:senha152@cluster0.udoxk.mongodb.net/backend-todolist?retryWrites=true&w=majority',  { useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true}).then(() => {
    console.log('funcionando')
})

app.listen(port, () => {
    console.log('funcionando na 3003')
})
