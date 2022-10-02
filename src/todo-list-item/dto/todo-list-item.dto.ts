import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinDate,
} from "class-validator";
import { Transform } from "class-transformer";
import { Flag } from "@prisma/client";

export class TodoListItemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  freeText: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  deadLine: Date;

  @IsOptional()
  @IsEnum(Flag)
  flag: Flag;
}
