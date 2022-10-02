import { Transform } from "class-transformer";

export class NumDto {
  @Transform(({ value }) => Number(value))
  public id: number;
}
