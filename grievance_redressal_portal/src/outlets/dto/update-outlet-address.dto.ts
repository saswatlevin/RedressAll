import { PartialType, PickType } from '@nestjs/swagger';
import { OutletUniversalDto } from './outlet-universal.dto';

// Using PartialType allows only some fields to be updated.
// Using OmitType allows the outlet_name and chain_id fields to be omitted.
export class UpdateOutletAddressDto extends PartialType(
  PickType(OutletUniversalDto, [
    'outlet_address_room_no', 
    'outlet_address_building', 
    'outlet_address_street',
    'outlet_address_city',
    'outlet_address_admin_division',
    'outlet_address_country',
    'outlet_address_post_code'
  ] as const),
) {};