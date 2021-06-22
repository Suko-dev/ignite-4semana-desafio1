import { Statement } from "../../entities/Statement";

export type IMakeTransferDTO =
Pick<
  Statement,
  'user_id' |
  'id' |
  'description' |
  'amount' |
  'type'
>
