const express = require('express');
const Container = require("./container");

const app = express();
app.use(express.json());
app.set('container', new Container());

app.get('/users', async(req, res) => {
    const repository = await app.get('container').getRepository();
    const users = await repository.findAll();
    res.json(users);
})

app.post('/users', async(req, res) => {
    const repository = await app.get('container').getRepository();
    try {
        const user = await repository.create(req.body);
        res.status(201).json(user);
    } catch(e) {
        res.status(500).json({error: e.message});
    }
})

app.get('/users:id', async(req, res) => {
    
})

app.put('/users:id', async(req, res) => {
    
})

app.delete('/users:id', async(req, res) => {
    
})

module.exports = app;