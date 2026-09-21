import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "./user-universal.dto";

export class UpdateUserEmailDto extends PickType (
    UserUniversalDto,
    ['user_email'] as const,
)
{}