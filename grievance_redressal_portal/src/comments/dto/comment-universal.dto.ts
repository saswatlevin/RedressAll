import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty,  IsInt, MaxLength, Matches, IsBoolean, IsDate} from 'class-validator';
import { PARAGRAPH_REGEX } from '../../common.constants';
import { COMMENT_CONTENT_MAXIMUM_LENGTH } from '../comments.constants';
import { SanitizeXss } from '../../sanitizer/sanitize-xss.decorator';

export class CommentUniversalDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    comment_id!: number;

    @IsDate()
    @IsNotEmpty()
    comment_date_created_at!: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(PARAGRAPH_REGEX)
    @MaxLength(COMMENT_CONTENT_MAXIMUM_LENGTH)
    @SanitizeXss()
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