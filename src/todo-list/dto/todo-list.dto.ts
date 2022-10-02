import { IsNotEmpty, IsString } from "class-validator";

export class TodoListDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
