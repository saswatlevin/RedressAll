import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsDate, IsNotEmpty, IsEmail, Matches, IsInt, MaxLength, IsEnum, MATCHES} from 'class-validator';
import { PARAGRAPH_REGEX,  } from '../../common.constants';

import { USER_PASSWORD_REGEX, 
    USER_PASSWORD_MAXIMUM_LENGTH, 
    NAME_REGEX, 
    USER_FIRST_NAME_MAXIMUM_LENGTH, 
    USER_LAST_NAME_MAXIMUM_LENGTH, 
    USER_EMAIL_MAXIMUM_LENGTH, 
    USER_MOBILE_NO_REGEX, 
    USER_MOBILE_NO_MAXIMUM_LENGTH, 
    USER_STATUS,
    USER_ROLE } from '../user.constants';

import {ADDRESS_ROOM_NUMBER_MAXIMUM_LENGTH, 
        ADDRESS_ROOM_NUMBER_REGEX, 
        ADDRESS_BUILDING_MAXIMUM_LENGTH, 
        ADDRESS_BUILDING_REGEX,
        ADDRESS_STREET_MAXIMUM_LENGTH,
        ADDRESS_STREET_REGEX,
        ADDRESS_CITY_MAXIMUM_LENGTH,
        ADDRESS_CITY_REGEX,
        ADDRESS_ADMIN_DIVISION_MAXIMUM_LENGTH,
        ADDRESS_ADMIN_DIVISION_REGEX,
        ADDRESS_COUNTRY_MAXIMUM_LENGTH,
        ADDRESS_COUNTRY_REGEX,
        ADDRESS_POST_CODE_MAXIMUM_LENGTH,
        ADDRESS_POST_CODE_REGEX } from '../../common.constants';


export class UserUniversalDto  {
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    user_id!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    user_date_created_at!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(NAME_REGEX)
    @MaxLength(USER_FIRST_NAME_MAXIMUM_LENGTH)
    user_first_name!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(NAME_REGEX)
    @MaxLength(USER_LAST_NAME_MAXIMUM_LENGTH)
    user_last_name!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(USER_PASSWORD_REGEX)
    @MaxLength(USER_PASSWORD_MAXIMUM_LENGTH)
    user_password!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(USER_EMAIL_MAXIMUM_LENGTH)
    user_email!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    user_dob!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEnum(USER_ROLE)
    user_role!: string;

    @ApiProperty()
    @IsString()
    @Matches(ADDRESS_ROOM_NUMBER_REGEX)
    @MaxLength(ADDRESS_ROOM_NUMBER_MAXIMUM_LENGTH)
    user_address_room_no?: string;

    @ApiProperty()
    @IsString()
    @Matches(ADDRESS_BUILDING_REGEX)
    @MaxLength(ADDRESS_BUILDING_MAXIMUM_LENGTH)
    user_address_building?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(ADDRESS_STREET_REGEX)
    @MaxLength(ADDRESS_STREET_MAXIMUM_LENGTH)
    user_address_street!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(ADDRESS_CITY_REGEX)
    @MaxLength(ADDRESS_CITY_MAXIMUM_LENGTH)
    user_address_city!: string;

    @ApiProperty()
    @IsString()
    @Matches(ADDRESS_ADMIN_DIVISION_REGEX)
    @MaxLength(ADDRESS_ADMIN_DIVISION_MAXIMUM_LENGTH)
    user_address_admin_division?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(ADDRESS_COUNTRY_REGEX)
    @MaxLength(ADDRESS_COUNTRY_MAXIMUM_LENGTH)
    user_address_country!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(ADDRESS_POST_CODE_REGEX)
    @MaxLength(ADDRESS_POST_CODE_MAXIMUM_LENGTH)
    user_address_post_code!: string;

    @ApiProperty()
    @IsInt()
    outlet_id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(USER_MOBILE_NO_REGEX)
    @MaxLength(USER_MOBILE_NO_MAXIMUM_LENGTH)
    user_mobile_no!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(USER_STATUS)
    user_status!: string;
}