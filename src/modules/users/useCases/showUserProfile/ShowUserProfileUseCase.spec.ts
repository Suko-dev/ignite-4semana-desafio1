import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;


describe("Find user", () => {
    beforeEach(() => {
      inMemoryUsersRepository = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(
          inMemoryUsersRepository
        );
        showUserProfileUseCase = new ShowUserProfileUseCase(
          inMemoryUsersRepository
        );
    });
    it("should be able to find user by id", async () => {
        const userid = await createUserUseCase.execute({
          name: "test",
          email: "test@test.com",
          password: "1234"
        });
        const user = await showUserProfileUseCase.execute(String(userid.id))
        expect(user).toBeDefined()
        expect(user).toHaveProperty('id')
    });
});
