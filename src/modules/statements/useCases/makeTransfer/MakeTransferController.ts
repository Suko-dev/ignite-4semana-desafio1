import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MakeTransferUseCase } from './MakeTransferUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

export class MakeTransferController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;
    const { amount, description } = request.body;
    const  user_id  = request.params.user_id

    const type = OperationType.TRANSFER

    const makeTransfer = container.resolve(MakeTransferUseCase);

    const statement = await makeTransfer.execute({
      user_id,
      id,
      type,
      amount,
      description
    });

    return response.status(201).json(statement);
  }
}
