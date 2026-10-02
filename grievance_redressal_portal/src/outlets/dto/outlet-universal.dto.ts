import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsString, IsNotEmpty, MaxLength, Matches, IsInt, IsDate} from 'class-validator';
import {OUTLET_NAME_REGEX, OUTLET_NAME_MAXIMUM_LENGTH} from '../outlets.constants';
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
        ADDRESS_POST_CODE_REGEX} from '../../common.constants';

// For all mandatory fields, use the definite assignmetn operator "!"
export class OutletUniversalDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  outlet_id!: number;

  @IsDate()
  @IsNotEmpty()
  outlet_date_created_at!: Date;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(OUTLET_NAME_MAXIMUM_LENGTH)
  @Matches(OUTLET_NAME_REGEX)
  outlet_name!: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(ADDRESS_ROOM_NUMBER_MAXIMUM_LENGTH)
  @Matches(ADDRESS_ROOM_NUMBER_REGEX)
  outlet_address_room_no?: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(ADDRESS_BUILDING_MAXIMUM_LENGTH)
  @Matches(ADDRESS_BUILDING_REGEX)
  outlet_address_building?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(ADDRESS_STREET_MAXIMUM_LENGTH)
  @Matches(ADDRESS_STREET_REGEX)
  outlet_address_street!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(ADDRESS_CITY_MAXIMUM_LENGTH)
  @Matches(ADDRESS_CITY_REGEX)
  outlet_address_city!: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(ADDRESS_ADMIN_DIVISION_MAXIMUM_LENGTH)
  @Matches(ADDRESS_ADMIN_DIVISION_REGEX)
  outlet_address_admin_division?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(ADDRESS_COUNTRY_MAXIMUM_LENGTH)
  @Matches(ADDRESS_COUNTRY_REGEX)
  outlet_address_country!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(ADDRESS_POST_CODE_MAXIMUM_LENGTH)
  @Matches(ADDRESS_POST_CODE_REGEX)
  outlet_address_post_code!: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  chain_id!: number;
};