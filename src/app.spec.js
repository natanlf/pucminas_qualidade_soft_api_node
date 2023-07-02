const app = require('./app');
const Container = require('./container');
const request = require('supertest')(app);

describe('User Management API', () => {
    let repository;
    let client;

    beforeAll(async() => {
        const container = new Container();
        client = container.getClient();
        repository = await container.getRepository();
    });

    afterAll(async() => {
        await client.close();
    });

    beforeEach(async() => {
        await repository.deleteAll();
    });

    describe("Endpoints de coleção", () => {

        test('GET /users', async () => {
            const user = {
                name: "Angela",
                email: "angela@gmail.com",
                password: "123456"
            }
            await repository.create(user);

            const response = await request
            .get('/users')
            .expect('Content-type', /application\/json/);
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0]).toStrictEqual(expect.objectContaining({
                "email": "angela@gmail.com",
                "name": "Angela",
                "password": "123456"
            }));
        })

        test('POST /users', async () => {
            const user = {
                name: "Angela",
                email: "angela@gmail.com",
                password: "123456"
            }
            const response = await request.post('/users').send(user);
            expect(response.statusCode).toBe(201);
            expect(response.body).toStrictEqual(expect.objectContaining(user));
        });

    });    
})