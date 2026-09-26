import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserNameDto } from './dto/update-user-name.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UpdateUserOutletIdDto } from './dto/update-user-outletid.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { SearchUsersByNameDto } from './dto/search-users-by-name.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('create_user')
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log("In createUser");
        return this.usersService.createUser(createUserDto);
    }

    @Patch('update_user_name/:user_id')
    updateUserName(@Param('user_id', ParseIntPipe) user_id: number, @Body() updateUserNameDto: UpdateUserNameDto) {
        console.log("In updateUserName");
        return this.usersService.updateUserName(user_id, updateUserNameDto);
    }

    @Patch('update_user_role/:user_id')
    updateUserRole(@Param('user_id', ParseIntPipe) user_id: number, @Body() updateUserRoleDto: UpdateUserRoleDto) {
        console.log("In updateUserRole");
        return this.usersService.updateUserRole(user_id, updateUserRoleDto);
    }

    @Patch('update_user_password/:user_id')
    updateUserPassword(@Param('user_id', ParseIntPipe) user_id: number, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
        console.log("In updateUserPassword");
        return this.usersService.updateUserPassword(user_id, updateUserPasswordDto);
    }

    @Patch('update_user_status/:user_id')
    updateUserStatus(@Param('user_id', ParseIntPipe) user_id: number, @Body() updateUserStatusDto: UpdateUserStatusDto) {
        console.log("In updateUserStatus");
        return this.usersService.updateUserStatus(user_id, updateUserStatusDto);
    }

    @Patch('update_user_email/:user_id')
    updateUserEmail(@Param('user_id', ParseIntPipe) user_id: number, @Body() updateUserEmailDto: UpdateUserEmailDto) {
        console.log("In updateUserEmail");
        return this.usersService.updateUserEmail(user_id, updateUserEmailDto);
    }

    @Patch('update_user_outletid/:user_id')
    updateUserOutletId(@Param('user_id', ParseIntPipe) user_id: number, @Body() updateUserOutletIdDto: UpdateUserOutletIdDto) {
        console.log("In updateUserOutletId");
        return this.usersService.updateUserOutletId(user_id, updateUserOutletIdDto);
    }

    @Patch('update_user_address/:user_id')
    updateUserAddress(@Param('user_id', ParseIntPipe) user_id: number, @Body() updateUserAddressDto: UpdateUserAddressDto) {
        console.log("In updateUserAddress");
        return this.usersService.updateUserAddress(user_id, updateUserAddressDto);
    }

    @Get('search_users_by_name')
    searchUsersByName(@Body() searchUsersByNameDto: SearchUsersByNameDto) {
        console.log("In searchUsersByName");
        return this.usersService.searchUsersByName(searchUsersByNameDto);
    }

    @Get('find_one_user/:user_id')
    findOneUser(@Param('user_id', ParseIntPipe) user_id: number) {
        console.log("In findOneUser");
        return this.usersService.findOneUser(user_id);
    }

    @Get('find_all_users')
    findAllUsers() {
        console.log("In findAllUsers");
        return this.usersService.findAllUsers();
    }

    @Delete('remove_user/:user_id')
    removeUser(@Param('user_id', ParseIntPipe) user_id: number) {
        console.log("In removeUser");
        return this.usersService.removeUser(user_id);
    }
    
}
