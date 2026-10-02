import { PickType } from '@nestjs/swagger';
import { PostUniversalDto } from './post-universal.dto';

export class SearchPostTitleDto extends PickType (
    PostUniversalDto, ['post_title'] as const,
){};