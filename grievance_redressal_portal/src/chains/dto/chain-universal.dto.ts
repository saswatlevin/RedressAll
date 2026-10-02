import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsString, IsNotEmpty, MaxLength, Matches, IsDate, IsInt} from 'class-validator';
import {CHAIN_NAME_REGEX, CHAIN_NAME_MAXIMUM_LENGTH} from '../chains.constants';
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

// For all mandatory fields, use the definite assignmetn operator "!"
export class ChainUniversalDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  chain_id!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(CHAIN_NAME_MAXIMUM_LENGTH)
  @Matches(CHAIN_NAME_REGEX)
  chain_name!: string;

  @IsDate()
  @IsNotEmpty()
  chain_date_created_at!: Date

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(ADDRESS_ROOM_NUMBER_MAXIMUM_LENGTH)
  @Matches(ADDRESS_ROOM_NUMBER_REGEX)
  chain_headquarters_address_room_no?: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(ADDRESS_BUILDING_MAXIMUM_LENGTH)
  @Matches(ADDRESS_BUILDING_REGEX)
  chain_headquarters_address_building?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(ADDRESS_STREET_MAXIMUM_LENGTH)
  @Matches(ADDRESS_STREET_REGEX)
  chain_headquarters_address_street!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(ADDRESS_CITY_MAXIMUM_LENGTH)
  @Matches(ADDRESS_CITY_REGEX)
  chain_headquarters_address_city!: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(ADDRESS_ADMIN_DIVISION_MAXIMUM_LENGTH)
  @Matches(ADDRESS_ADMIN_DIVISION_REGEX)
  chain_headquarters_address_admin_division?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(ADDRESS_COUNTRY_MAXIMUM_LENGTH)
  @Matches(ADDRESS_COUNTRY_REGEX)
  chain_headquarters_address_country!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(ADDRESS_POST_CODE_MAXIMUM_LENGTH)
  @Matches(ADDRESS_POST_CODE_REGEX)
  chain_headquarters_address_post_code!: string;
}