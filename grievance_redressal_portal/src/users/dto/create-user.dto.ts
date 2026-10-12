import { OmitType } from '@nestjs/swagger';

import { UserUniversalDto } from './user-universal.dto';

export class CreateUserDto extends OmitType(
    UserUniversalDto,
    [
        'user_first_name',
        'user_last_name',
        'user_password',
        'user_email',
        'user_dob',
        'user_address_room_no', 
        'user_address_building', 
        'user_address_street',
        'user_address_city',
        'user_address_admin_division',
        'user_address_country',
        'user_address_post_code',
        'user_mobile_no'

    ] as const
) {}