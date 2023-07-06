const UserRepository = require("../repository");

describe("UserRepository", () => {

    test('findAll', async () => {

        const collection = {
            find: jest.fn()
        }
        const repository = new UserRepository(collection)

        collection.find.mockReturnValue({
            toArray: () => [{
                name: "Angela",
                email: "angela@gmail.com",
                password: "123456"
            }]
        })

        const users = await repository.findAll();
        expect(users[0]).toStrictEqual(expect.objectContaining({
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }));

    });

    test('findById', async () => {

        const collection = {
            findOne: jest.fn()
        }
        const repository = new UserRepository(collection)

        collection.findOne.mockReturnValue({
            id: 1,
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        })

        const user = await repository.findById(1);

        expect(user).toStrictEqual(expect.objectContaining({
            id: 1,
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }));

    });

    test('create', async () => {

        const collection = {
            insertOne: jest.fn()
        }
        const repository = new UserRepository(collection)

        collection.insertOne.mockReturnValue({
            id: 1,
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        })

        const user = await repository.create({
            id: 1,
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        });

        expect(user).toStrictEqual(expect.objectContaining({
            id: 1,
            name: "Angela",
            email: "angela@gmail.com",
            password: "123456"
        }));

    });

    test('update', async () => {

        const collection = {
            updateOne: jest.fn()
        }
        const repository = new UserRepository(collection)

        collection.updateOne.mockReturnValue({
            id: 1,
            name: "Angela",
            email: "angela_santos@gmail.com",
            password: "123456"
        })

       await repository.update({
            id: 1,
            name: "Angela",
            email: "angela_santos@gmail.com",
            password: "123456"
        });

    });

    test('deleteOne', async () => {

        const collection = {
            deleteOne: jest.fn()
        }
        const repository = new UserRepository(collection)

        collection.deleteOne.mockReturnValue({
            _id: 1,
            name: "Angela",
            email: "angela_santos@gmail.com",
            password: "123456"
        })

       await repository.delete({
            _id: 1,
            name: "Angela",
            email: "angela_santos@gmail.com",
            password: "123456"
        });

    });

    test('deleteAll', async () => {

        const collection = {
            deleteMany: jest.fn()
        }
        const repository = new UserRepository(collection)

        collection.deleteMany.mockReturnValue({
            _id: 1,
            name: "Angela",
            email: "angela_santos@gmail.com",
            password: "123456"
        })

       await repository.deleteAll();

    });
});
