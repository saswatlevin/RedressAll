import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "./user-universal.dto";

export class UpdateUserIsModeratorDto extends PickType (
    UserUniversalDto,
    ['user_is_moderator'] as const,
)
{}