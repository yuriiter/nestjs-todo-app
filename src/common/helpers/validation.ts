import { BadRequestException } from "@nestjs/common";

export const validateNumber = (input: any, throwIfInvalid = true): number => {
  if (typeof input === "number") {
    return input;
  }

  const output = Number(input);
  if (output) {
    return output;
  }
  if (throwIfInvalid) {
    throw new BadRequestException("Parameter is not a number");
  }
};
