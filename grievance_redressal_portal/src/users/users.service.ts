import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole, UserStatus } from '../../generated/prisma/enums';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
    constructor (private readonly prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto) {

        const user_password: string = createUserDto.user_password;

        const hashed_user_password:string = await argon2.hash(user_password);


        

        return this.prisma.user.create({
            data: {
                user_first_name: createUserDto.user_first_name,
                user_last_name: createUserDto.user_last_name,
                user_password: hashed_user_password,
                user_email: createUserDto.user_email,
                user_dob: createUserDto.user_dob,
                user_role: createUserDto.user_role as UserRole,
                user_address_room_no: createUserDto.user_address_room_no,
                user_address_building: createUserDto.user_address_building,
                user_address_street: createUserDto.user_address_street,
                user_address_city: createUserDto.user_address_city,
                user_address_admin_division: createUserDto.user_address_admin_division,
                user_address_country: createUserDto.user_address_country,
                user_address_post_code: createUserDto.user_address_post_code,                

                
                 // If outlet_id was supplied, 
                 // connect the new user to the existing outlet having that ID; 
                 // otherwise, don't set the outlet relation. 
                 
                outlet: createUserDto.outlet_id
                ? {
                    connect: {
                        outlet_id: createUserDto.outlet_id
                    }
                    }
                : undefined,

                user_mobile_no: createUserDto.user_mobile_no,
                user_status: createUserDto.user_status as UserStatus
            }
        });
        

    }
}
