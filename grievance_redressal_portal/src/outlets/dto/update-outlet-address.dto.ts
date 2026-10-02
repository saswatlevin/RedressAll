import { PartialType, OmitType } from '@nestjs/swagger';
import { OutletUniversalDto } from './outlet-universal.dto';

// Using PartialType allows only some fields to be updated.
// Using OmitType allows the outlet_name and chain_id fields to be omitted.
export class UpdateOutletAddressDto extends PartialType(
  OmitType(OutletUniversalDto, ['outlet_id', 'outlet_date_created_at', 'outlet_name', 'chain_id'] as const),
) {};