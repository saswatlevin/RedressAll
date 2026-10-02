import { OmitType } from "@nestjs/swagger";
import { OutletUniversalDto } from "./outlet-universal.dto";

// For all mandatory fields, use the definite assignmetn operator "!"
export class CreateOutletDto extends OmitType (
  OutletUniversalDto,
  ['outlet_id', 'outlet_date_created_at']
) {};