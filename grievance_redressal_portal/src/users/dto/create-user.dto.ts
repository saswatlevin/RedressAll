import { OmitType } from '@nestjs/swagger';

import { UserUniversalDto } from './user-universal.dto';

export class CreateUserDto extends OmitType(
    UserUniversalDto,
    ['user_id', 'user_date_created_at'] as const
) {}