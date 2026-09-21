import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "./user-universal.dto";

export class UpdateUserAddressDto extends PickType (
    UserUniversalDto,
    ['user_address_room_no', 'user_address_building', 'user_address_street', 'user_address_city', 'user_address_admin_division', 'user_address_country', 'user_address_post_code'] as const,
)
{}