import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Auth user", () => {
    beforeEach(() => {
      inMemoryUsersRepository = new InMemoryUsersRepository();
        authUserUseCase = new AuthenticateUserUseCase(
          inMemoryUsersRepository
        );
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    });
    it("should be able to auth user", async () => {
      await createUserUseCase.execute({
        name: "test",
        email: "test@test.com",
        password: "1234"
      })
        const token =  await authUserUseCase.execute({
          email: "test@test.com",
          password: "1234"
        });
        expect(token).toHaveProperty("token");
    });

});
