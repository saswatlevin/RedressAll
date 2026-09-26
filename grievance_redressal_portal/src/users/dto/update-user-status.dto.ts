import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "./user-universal.dto";

export class UpdateUserStatusDto extends PickType (
    UserUniversalDto,
    ['user_status'] as const,
)
{}