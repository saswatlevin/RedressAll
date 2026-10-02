import { OmitType } from "@nestjs/swagger";
import { ChainUniversalDto } from "./chain-universal.dto";

export class CreateChainDto extends OmitType (
ChainUniversalDto, ['chain_id', 'chain_date_created_at'] as const,
) {}