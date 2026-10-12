import { PickType } from "@nestjs/swagger";
import { ChainUniversalDto } from "./chain-universal.dto";

export class CreateChainDto extends PickType (
ChainUniversalDto, [
        'chain_name', 
        'chain_headquarters_address_room_no', 
        'chain_headquarters_address_building', 
        'chain_headquarters_address_street',
        'chain_headquarters_address_city',
        'chain_headquarters_address_admin_division',
        'chain_headquarters_address_country',
        'chain_headquarters_address_post_code'
    ] as const,
) {}