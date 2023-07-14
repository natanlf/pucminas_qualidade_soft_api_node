const express = require('express');
const Container = require("./container");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    exposedHeaders: ['x-total-count']
}));
app.set('container', new Container());

const normalizePk = user => {
    user.id = user._id;
    delete user._id;
    return user;
}

app.get('/users', async(req, res) => {
    const repository = await app.get('container').getRepository();
    const users = (await repository.findAll()).map(normalizePk);
    res.set('X-Total-Count', users.lenght);
    res.json(users);
})

app.post('/users', async(req, res) => {
    const repository = await app.get('container').getRepository();
    try {
        const user = await repository.create(req.body);
        res.status(201).json(normalizePk(user));
    } catch(e) {
        res.status(500).json({error: e.message});
    }
})

app.get('/users/:id', async(request, response) => {
    
    const repository = await app.get('container').getRepository();

    try {
        const user = await repository.findById(request.params.id);

        if (user === null) {
            response.status(404).json({
                status: 404,
                error: 'Usuário não encontrado'
            });
        } else {
            response.json(normalizePk(user));
        }
        
    } catch (e) {
        console.log(e);
        response.status(500).json({error: e.message});
    }
});

app.put('/users/:id', async(request, response) => {

    const repository = await app.get('container').getRepository();
    const user = await repository.findById(request.params.id);
    
    if (user === null) {
        response.status(404).json({
            status: 404,
            error: 'Usuário não encontrado'
        });
    } else {
        const newUser = {...user, ...request.body};
        await repository.update(newUser);
        response.json(normalizePk(newUser));
    }
});

app.delete('/users/:id', async(request, response) => {
    const repository = await app.get('container').getRepository();
    const user = await repository.findById(request.params.id);

    if (null !== user) {
        await repository.delete(user);
        response.sendStatus(204);
    } else {
        response.status(404).json({
            status: 404,
            error: 'Usuário não encontrado'
        });
    }
});

app.delete('/users', async(req, res) => {
    const repository = await app.get('container').getRepository();
    await repository.deleteAll();
    res.sendStatus(204);
});

module.exports = app;