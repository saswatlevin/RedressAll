import { PickType } from "@nestjs/swagger";
import { OutletUniversalDto } from './outlet-universal.dto';

export class UpdateOutletNameDto extends PickType (
  OutletUniversalDto, 
  ['outlet_name']
) {};
