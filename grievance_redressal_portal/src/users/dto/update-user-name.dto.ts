import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsString, IsOptional, Validate} from 'class-validator';

class AtLeastOneValidator {
  validate(_: any, args: any) {
    const obj = args.object;

    return (
      obj.address !== undefined &&
      obj.address !== null &&
      obj.address !== ''
    ) || (
      obj.country !== undefined &&
      obj.country !== null &&
      obj.country !== ''
    );
  }

  defaultMessage() {
    return 'At least one field must be provided';
  }
}

export class UpdateUserNameDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Validate(AtLeastOneValidator)
    user_first_name!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    user_last_name!: string;
};