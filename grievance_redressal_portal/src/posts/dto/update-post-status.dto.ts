import { PickType } from '@nestjs/swagger';
import { PostUniversalDto } from './post-universal.dto';

export class UpdatePostStatusDto extends PickType(
  PostUniversalDto, ['post_status'] as const,
) {}