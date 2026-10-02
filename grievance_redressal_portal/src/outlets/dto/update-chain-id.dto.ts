import { PickType } from "@nestjs/swagger";
import { OutletUniversalDto } from './outlet-universal.dto';

export class UpdateChainIdDto extends PickType (
  OutletUniversalDto, 
  ['chain_id', 'outlet_id']
) {};