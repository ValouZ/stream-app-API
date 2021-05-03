const express = require('express');
const userRoutes = require('./routes/userRoutes');

const {connect} = require('mongoose');

const app = express();

app.use(express.json());

app.use(userRoutes);

connect('mongodb+srv://nathan:umvnp5hy@cluster0.xf1ae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connexion ok');
        app.listen(3000);
    })
    .catch(e => {
        console.log(e)
    })