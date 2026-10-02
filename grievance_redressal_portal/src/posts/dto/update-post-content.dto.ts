import { PickType } from '@nestjs/swagger';
import { PostUniversalDto } from './post-universal.dto';

export class UpdatePostContentDto extends PickType(
 PostUniversalDto, ['post_content'] as const,
) {}