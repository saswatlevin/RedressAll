import { PickType } from '@nestjs/swagger';
import { ChainUniversalDto } from './chain-universal.dto';

export class UpdateChainNameDto extends PickType (
ChainUniversalDto, ['chain_name'] as const,
) {}