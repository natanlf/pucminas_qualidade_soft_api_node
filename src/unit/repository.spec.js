const UserRepository = require("../repository");
const Container = require("../container");

describe("UserRepository", () => {

   // let collection;
  //  let repository;

   /* beforeEach(async() => {
        collection = {
            findOne: jest.fn()
        }
        repository = new UserRepository(collection)
    });*/

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
});
