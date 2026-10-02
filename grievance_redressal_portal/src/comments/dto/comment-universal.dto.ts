import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsString, IsNotEmpty,  IsInt, MaxLength, Matches, IsBoolean} from 'class-validator';
import { PARAGRAPH_REGEX } from '../../common.constants';
import { COMMENT_CONTENT_MAXIMUM_LENGTH } from '../comments.constants';

export class CommentUniversalDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    comment_id!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(PARAGRAPH_REGEX)
    @MaxLength(COMMENT_CONTENT_MAXIMUM_LENGTH)
    comment_content!: string; 

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    comment_is_deleted!: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    post_id!: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    user_id!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    parent_id!: number;
}