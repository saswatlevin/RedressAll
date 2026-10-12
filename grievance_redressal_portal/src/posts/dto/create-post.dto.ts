import { PickType } from "@nestjs/swagger";
import { PostUniversalDto } from "./post-universal.dto";

export class CreatePostDto extends PickType (
  PostUniversalDto,
  [
    'post_title', 
    'post_content', 
    'user_id', 
    'post_status'
  ]
) {};
