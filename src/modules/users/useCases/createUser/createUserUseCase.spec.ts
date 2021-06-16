import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";


let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create user", () => {
    beforeEach(() => {
      inMemoryUsersRepository = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(
          inMemoryUsersRepository
        );
    });
    it("should be able to create a new user", async () => {
        await createUserUseCase.execute({
          name: "test",
          email: "test@test.com",
          password: "1234"
        });
        const user = await inMemoryUsersRepository.findByEmail("test@test.com")
        expect(user).toHaveProperty("id");
    });
});
