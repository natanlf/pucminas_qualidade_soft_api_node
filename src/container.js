const {MongoClient} = require('mongodb');
const UserRepository = require('./repository');

class Container {

    services = {};
    params = {};

    setParam(name, value) {
        this.params[name] = value;
    }

    getClient() {

        if (this.services.client !== undefined) {
            return this.services.client;
        }

        const uri = 'mongodb://root:root@localhost?retryWrites=true&writeConcern=majority'
        const client = new MongoClient(uri);

        return this.services.client = client;
    }

    async getRepository() {

        if (this.services.repository !== undefined) {
            return this.services.repository;

        }

        const client = this.getClient();

        await client.connect();
        const collection = client.db('app_db').collection('users');

        return this.services.repository = new UserRepository(collection);
    }
}

module.exports = Container;