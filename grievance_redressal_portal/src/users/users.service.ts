import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole, UserStatus } from '../../generated/prisma/enums';
import * as argon2 from 'argon2';
import { UpdateUserNameDto } from './dto/update-user-name.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UpdateUserOutletIdDto } from './dto/update-user-outletid.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { SearchUsersByNameDto } from './dto/search-users-by-name.dto';

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

    async updateUserName(userId: number, updateUserNameDto: UpdateUserNameDto) {
        return this.prisma.user.update({
            where: {
              user_id: userId
            },
            data: updateUserNameDto
          });
    }

    async updateUserRole(userId: number, updateUserRoleDto: UpdateUserRoleDto) {
        return this.prisma.user.update({
            where: {
              user_id: userId
            },
            
            data: updateUserRoleDto
          });
    }

    async updateUserPassword(userId: number, updateUserPasswordDto: UpdateUserPasswordDto) {
        
        const updated_user_password_plaintext: string = updateUserPasswordDto.user_password;
        const updated_user_password_hashed: string = await argon2.hash(updated_user_password_plaintext);
        
        updateUserPasswordDto.user_password = updated_user_password_hashed;
        
        return this.prisma.user.update({
            where: {
              user_id: userId
            },
            
            data: updateUserPasswordDto
          });
    }

    async updateUserStatus(userId: number, updateUserStatusDto: UpdateUserStatusDto) {
                
        return this.prisma.user.update({
            where: {
              user_id: userId
            },
            
            data: updateUserStatusDto
          });
    }

    async updateUserEmail(userId: number, updateUserEmailDto: UpdateUserEmailDto) {
                
        return this.prisma.user.update({
            where: {
              user_id: userId
            },
            
            data: updateUserEmailDto
          });
    }

    async updateUserOutletId(userId: number, updateUserOutletIdDto: UpdateUserOutletIdDto) {
                
        return this.prisma.user.update({
            where: {
              user_id: userId
            },
            
            data: updateUserOutletIdDto
          });
    }

    async updateUserAddress(userId: number, updateUserAddressDto: UpdateUserAddressDto) {
                
        return this.prisma.user.update({
            where: {
              user_id: userId
            },
            
            data: updateUserAddressDto
          });
    }

    async searchUsersByName(searchUsersByNameDto: SearchUsersByNameDto) {
        
        // Dynamically builds the Prisma where object.
        // Adds a first-name filter if user_first_name is provided.
        // Adds a last-name filter if user_last_name is provided.
        // "mode: insensitive" makes the name comparison case-insensitive.
        // If both are provided, both conditions are applied.
       return this.prisma.user.findMany({
            where: {
                ...(searchUsersByNameDto.user_first_name && {
                    user_first_name: {
                        startsWith: searchUsersByNameDto.user_first_name,
                        mode: 'insensitive'
                    }
                }),
                ...(searchUsersByNameDto.user_last_name && {
                    user_last_name: {
                        startsWith: searchUsersByNameDto.user_last_name,
                        mode: 'insensitive'
                    }
                })
            }
        });
    }

    async findOneUser(userId: number) {
        return this.prisma.user.findUnique({
            where: {
                user_id: userId
        }});
    }

    async findAllUsers() {
        return this.prisma.user.findMany();
    }

    async removeUser(userId: number) {
        return this.prisma.user.delete({
            where: {
                user_id: userId
        }});
    }
}

