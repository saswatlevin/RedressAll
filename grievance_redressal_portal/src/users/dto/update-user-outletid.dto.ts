import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "./user-universal.dto";

export class UpdateUserOutletIdDto extends PickType (
    UserUniversalDto,
    ['outlet_id'] as const,
)
{}