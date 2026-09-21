import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "./user-universal.dto";

export class UpdateUserRoleDto extends PickType (
    UserUniversalDto,
    ['user_role'] as const,
)
{}