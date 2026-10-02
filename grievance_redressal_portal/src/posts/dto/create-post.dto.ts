import { OmitType } from "@nestjs/swagger";
import { PostUniversalDto } from "./post-universal.dto";

export class CreatePostDto extends OmitType (
  PostUniversalDto,['post_id', 'post_date_created_at']
) {};
