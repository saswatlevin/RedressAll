import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "./user-universal.dto";

export class UpdateUserPasswordDto extends PickType (
    UserUniversalDto,
    ['user_password'] as const,
)
{}