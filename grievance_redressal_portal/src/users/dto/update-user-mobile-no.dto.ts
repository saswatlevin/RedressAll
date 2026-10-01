import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "./user-universal.dto";

export class UpdateUserMobileNoDto extends PickType (
    UserUniversalDto,
    ['user_mobile_no'] as const,
)
{}