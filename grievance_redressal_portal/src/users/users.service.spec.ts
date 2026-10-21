import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserRole, UserStatus } from '../generated/prisma/enums';

describe('Database tests - UsersService', () => {
  let prisma: PrismaService;
  let usersService: UsersService;
  let moduleRef: TestingModule;

  const REQUESTED_USER_ID = 19;
  const INITIAL_EMAIL = 'els@server.com';
  const UPDATED_EMAIL = 'els01@server.com';

  let testUserId: number | undefined;
  let userCreatedByTest = false;

  beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    imports: [PrismaModule],
    providers: [
      UsersService,
      {
        provide: WINSTON_MODULE_PROVIDER,
        useValue: {},
      },
    ],
  }).compile();

  prisma = moduleRef.get<PrismaService>(PrismaService);
  usersService = moduleRef.get<UsersService>(UsersService);
});

  afterAll(async () => {
    try {
      // Clean up if a test fails before the deletion test.
      if (userCreatedByTest && testUserId !== undefined) {
        await prisma.user.deleteMany({
          where: { user_id: testUserId },
        });
      }
    } finally {
      await prisma?.$disconnect();
      await moduleRef?.close();
    }
  });

  // TEST 1: CREATE USER
it('1. should create a user using createUser', async () => {
  const userData = {
    user_first_name: 'ELSFname',
    user_last_name: 'ELSLname',
    user_password: 'els@108pwd01',
    user_email: 'els@server.com',
    user_dob: new Date('1991-03-08'),
    user_address_room_no: null,
    user_address_building: '3258',
    user_address_street: 'Dhahran Street',
    user_address_city: 'Al Khobar',
    user_address_admin_division: 'Eastern Province',
    user_address_country: 'Saudi Arabia',
    user_address_post_code: '34446',
    user_mobile_no: '966553123456',
  };

  const createdUser = await usersService.createUser(
    userData as any,
  );

  testUserId = createdUser.user_id;
  userCreatedByTest = true;

  expect(createdUser).toMatchObject({
    user_first_name: 'ELSFname',
    user_last_name: 'ELSLname',
    user_email: 'els@server.com',
    user_role: UserRole.restaurant_employee,
    user_address_room_no: null,
    user_address_building: '3258',
    user_address_street: 'Dhahran Street',
    user_address_city: 'Al Khobar',
    user_address_admin_division: 'Eastern Province',
    user_address_country: 'Saudi Arabia',
    user_address_post_code: '34446',
    user_mobile_no: '966553123456',
    user_status: UserStatus.active,
  });

  expect(createdUser.user_id).toEqual(expect.any(Number));
  expect(createdUser.user_dob).toBeInstanceOf(Date);
});

  // TEST 2: UPDATE USER FIRST NAME
  it('2. should update the user first name using updateUserName', async () => {
    const updatedUser = await usersService.updateUserName(
      REQUESTED_USER_ID,
      {
        user_first_name: 'UPDATED ELSFname',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_first_name: 'UPDATED ELSFname',
    });
  });

  // TEST 3: UPDATE USER ROLE
  it('3. should update the user role using updateUserRole', async () => {
    const updatedUser = await usersService.updateUserRole(
      REQUESTED_USER_ID,
      {
        user_role: UserRole.restaurant_manager,
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_role: UserRole.restaurant_manager,
    });
  });

  // TEST 4: UPDATE USER PASSWORD
  it('4. should update the user password using updateUserPassword', async () => {
    const updatedUser = await usersService.updateUserPassword(
      REQUESTED_USER_ID,
      {
        user_password: 'els@108pwd02',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
    });
  });

  // TEST 5: UPDATE USER EMAIL
  it('5. should update the user email using updateUserEmail', async () => {
    const updatedUser = await usersService.updateUserEmail(
      REQUESTED_USER_ID,
      {
        user_email: UPDATED_EMAIL,
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_email: UPDATED_EMAIL,
    });
  });

  // TEST 6: UPDATE USER STATUS
  it('6. should update the user status using updateUserStatus', async () => {
    const updatedUser = await usersService.updateUserStatus(
      REQUESTED_USER_ID,
      {
        user_status: UserStatus.suspended,
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_status: UserStatus.suspended,
    });
  });

  // TEST 7: UPDATE USER MOBILE NUMBER
  it('7. should update the user mobile number using updateUserMobileNo', async () => {
    const updatedUser = await usersService.updateUserMobileNo(
      REQUESTED_USER_ID,
      {
        user_mobile_no: '966553133456',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_mobile_no: '966553133456',
    });
  });

  // TEST 8: UPDATE USER MODERATOR STATUS
  it('8. should update the moderator status using updateUserIsModerator', async () => {
    const updatedUser = await usersService.updateUserIsModerator(
      REQUESTED_USER_ID,
      {
        user_is_moderator: true,
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_is_moderator: true,
    });
  });

  // TEST 9: SEARCH USERS BY NAME
  it('9. should search users by name using searchUsersByName', async () => {
    const results = await usersService.searchUsersByName({
      user_first_name: 'UPDATED ELSFname',
    } as any);

    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: REQUESTED_USER_ID,
          user_first_name: 'UPDATED ELSFname',
          user_email: UPDATED_EMAIL,
        }),
      ]),
    );
  });

  // TEST 10: FIND ONE USER
  it('10. should find the user using findOneUser', async () => {
    const foundUser = await usersService.findOneUser(
      REQUESTED_USER_ID,
    );

    expect(foundUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_first_name: 'UPDATED ELSFname',
      user_email: UPDATED_EMAIL,
      user_role: UserRole.restaurant_manager,
      user_status: UserStatus.suspended,
    });
  });

  // TEST 11: FIND USER BY EMAIL
  it('11. should find the user by email using findUserByEmail', async () => {
    const foundUser = await usersService.findUserByEmail({
      user_email: UPDATED_EMAIL,
    } as any);

    expect(foundUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_email: UPDATED_EMAIL,
    });
  });

  // TEST 12: UPDATE USER ADDRESS ROOM NUMBER
  it('12. should update the room number using updateUserAddress', async () => {
    const updatedUser = await usersService.updateUserAddress(
      REQUESTED_USER_ID,
      {
        user_address_room_no: '22',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_address_room_no: '22',
    });
  });

  // TEST 13: UPDATE USER ADDRESS BUILDING
  it('13. should update the building using updateUserAddress', async () => {
    const updatedUser = await usersService.updateUserAddress(
      REQUESTED_USER_ID,
      {
        user_address_building: 'USER HQ ADDRESS BUILDING',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: testUserId,
      user_address_building: 'USER HQ ADDRESS BUILDING',
    });
  });

  // TEST 14: UPDATE USER ADDRESS STREET
  it('14. should update the street using updateUserAddress', async () => {
    const updatedUser = await usersService.updateUserAddress(
      REQUESTED_USER_ID,
      {
        user_address_street: 'USER HQ ADDRESS STREET',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_address_street: 'USER HQ ADDRESS STREET',
    });
  });

  // TEST 15: UPDATE USER ADDRESS CITY
  it('15. should update the city using updateUserAddress', async () => {
    const updatedUser = await usersService.updateUserAddress(
      REQUESTED_USER_ID,
      {
        user_address_city: 'USER HQ ADDRESS CITY',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_address_city: 'USER HQ ADDRESS CITY',
    });
  });

  // TEST 16: UPDATE USER ADDRESS ADMINISTRATIVE DIVISION
  it('16. should update the administrative division using updateUserAddress', async () => {
    const updatedUser = await usersService.updateUserAddress(
      REQUESTED_USER_ID,
      {
        user_address_admin_division:
          'USER HQ ADDRESS ADMIN DIVISION',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_address_admin_division:
        'USER HQ ADDRESS ADMIN DIVISION',
    });
  });

  // TEST 17: UPDATE USER ADDRESS COUNTRY
  it('17. should update the country using updateUserAddress', async () => {
    const updatedUser = await usersService.updateUserAddress(
      REQUESTED_USER_ID,
      {
        user_address_country: 'India',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_address_country: 'India',
    });
  });

  // TEST 18: UPDATE USER ADDRESS POSTAL CODE
  it('18. should update the postal code using updateUserAddress', async () => {
    const updatedUser = await usersService.updateUserAddress(
      REQUESTED_USER_ID,
      {
        user_address_post_code: '313456',
      } as any,
    );

    expect(updatedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
      user_address_post_code: '313456',
    });
  });

  // TEST 19: DELETE USER
  it('19. should delete the user using removeUser', async () => {
    if (!userCreatedByTest || testUserId === undefined) {
      throw new Error(
        'Cannot delete user: the create-user test did not create it.',
      );
    }

    const deletedUser = await usersService.removeUser(
      REQUESTED_USER_ID,
    );

    userCreatedByTest = false;

    expect(deletedUser).toMatchObject({
      user_id: REQUESTED_USER_ID,
    });

    const foundUser = await usersService.findOneUser(
      REQUESTED_USER_ID,
    );

    expect(foundUser).toBeNull();
  });
});

/**
 * {
"user_id": 19,
"user_first_name": "ELSFname",
"user_last_name": "ELSLname",
"user_password": "els@108pwd01",
"user_email": "els@server.com",
"user_dob": "1991-03-08",
"user_role": "restaurant_employee",
"user_address_room_no": null,
"user_address_building": "3258",
"user_address_street": "Dhahran Street",
"user_address_city": "Al Khobar",
"user_address_admin_division": "Eastern Province",
"user_address_country": "Saudi Arabia",
"user_address_post_code": "34446",
"outlet_id": 6,
"user_mobile_no": "966553123456",
"user_is_moderator": false,
"user_status": "active"
}
 */