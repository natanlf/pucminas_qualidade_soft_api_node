const Container = require("../../container");

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

    test('Repositório deve atualizar um usuário', async() => {
        const user = {
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }
        const userCreated = await repository.create(user);

        user.email = "angela123@gmail.com";
        await repository.update(user);

        const result = await repository.findById(userCreated._id);
        expect(result).toStrictEqual(expect.objectContaining(user));
    });

    test('Repositório deve pegar um usuário por id', async() => {
        const user = {
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }
        const userCreated = await repository.create(user);

        const result = await repository.findById(userCreated._id);
        expect(result).toStrictEqual(expect.objectContaining(user));
    });

    test('Repositório deve remover um usuário', async() => {
        const user = {
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }

        const userCreated = await repository.create(user);

        await repository.delete(userCreated);

        const users = await repository.findAll();
        expect(users.length).toBe(0);
    });

    test('Repositorio não deve permitir remoção de usuário sem id', async () => {

        const user = {
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }

        const expression = () => repository.delete(user);
        await expect(expression).rejects.toThrow('Usuário inválido');
    });
});