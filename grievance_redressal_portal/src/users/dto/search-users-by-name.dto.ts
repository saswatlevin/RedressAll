import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "./user-universal.dto";

export class SearchUsersByNameDto extends PickType (
    UserUniversalDto,
    ['user_first_name', 'user_last_name'] as const,
)
{}