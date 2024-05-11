import { IsNotEmpty } from "class-validator";

export class CreateMessageToChannel {
  @IsNotEmpty()
  message: any;
}