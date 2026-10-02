import { PartialType, OmitType } from '@nestjs/swagger';
import { ChainUniversalDto } from './chain-universal.dto';

// Using PartialType allows only some fields to be updated.
// Using OmitType allows the chain_name field to be omitted.
export class UpdateChainAddressDto extends PartialType(
  OmitType(ChainUniversalDto, ['chain_name', 'chain_id', 'chain_date_created_at'] as const),
) {}