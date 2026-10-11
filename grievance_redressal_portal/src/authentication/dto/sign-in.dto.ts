import { PickType } from "@nestjs/swagger";
import { UserUniversalDto } from "../../users/dto/user-universal.dto";
export class SignInDto extends PickType (
    UserUniversalDto,
    ['user_email', 'user_password']
) {};