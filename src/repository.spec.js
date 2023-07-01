const Container = require("./container");

describe("UserRepository", () => {
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

    test('Repositório deve criar um novo usuário', async() => {
        const user = {
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }
        const result = await repository.create(user);

        expect(result).toStrictEqual(expect.objectContaining(user));

        const users = await repository.findAll();
        expect(users.length).toBe(1);
    });

    test('Repositório deve criar um novo usuário', async() => {
        const user = {
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }
        const result = await repository.create(user);

        expect(result).toStrictEqual(expect.objectContaining(user));

        const users = await repository.findAll();
        expect(users.length).toBe(1);
    });

    test('Repositório deve listar todos os usuários', async() => {
        const user = {
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }
        await repository.create(user);

        const users = await repository.findAll();
        expect(users.length).toBe(1);

        expect(users[0]).toStrictEqual(
            expect.objectContaining(user)
        );
    });
});