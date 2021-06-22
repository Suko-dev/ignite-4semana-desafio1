import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { MakeTransferError } from "./MakeTransferError";
import { IMakeTransferDTO } from "./IMakeTransferDTO";

@injectable()
export class MakeTransferUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({ user_id, id, type, amount, description }: IMakeTransferDTO) {
    const sendingUser = await this.usersRepository.findById(user_id);
    const recievingUser = await this.usersRepository.findById(id as string);
    if(!sendingUser || !recievingUser) {
      throw new MakeTransferError.UserNotFound();
    }
    const { balance } = await this.statementsRepository.getUserBalance({ user_id: id as string });

    if (balance - amount < 0) {
      throw new MakeTransferError.InsufficientFunds()
    }

    await this.statementsRepository.create({
     user_id,
     sender_id: id,
     type,
     amount,
     description
   });
    const statementOperation = await this.statementsRepository.create({
      user_id: id as string,
      sender_id: id,
      type,
      amount,
      description
    });

    return statementOperation;
  }
}
