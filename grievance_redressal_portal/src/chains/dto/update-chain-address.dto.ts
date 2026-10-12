import { PartialType, PickType } from '@nestjs/swagger';
import { ChainUniversalDto } from './chain-universal.dto';

// Using PartialType allows only some fields to be updated.
// Using OmitType allows the chain_name field to be omitted.
export class UpdateChainAddressDto extends PartialType(
  PickType(ChainUniversalDto, [
        'chain_headquarters_address_room_no', 
        'chain_headquarters_address_building', 
        'chain_headquarters_address_street',
        'chain_headquarters_address_city',
        'chain_headquarters_address_admin_division',
        'chain_headquarters_address_country',
        'chain_headquarters_address_post_code'
      ] as const),
) {}