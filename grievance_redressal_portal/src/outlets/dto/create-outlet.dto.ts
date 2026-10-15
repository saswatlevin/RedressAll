import { PickType } from "@nestjs/swagger";
import { OutletUniversalDto } from "./outlet-universal.dto";

// For all mandatory fields, use the definite assignmetn operator "!"
export class CreateOutletDto extends PickType (
  OutletUniversalDto, [     
    'outlet_name',
    'outlet_address_room_no', 
    'outlet_address_building', 
    'outlet_address_street',
    'outlet_address_city',
    'outlet_address_admin_division',
    'outlet_address_country',
    'outlet_address_post_code',
    'chain_id'
  ]
) {};