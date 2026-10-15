import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

/**
 * {
"user_id": 18,
"user_date_created_at": "2026-08-13T10:30:21.172944+05:30",
"user_first_name": "PSRFname",
"user_last_name": "PSRLname",
"user_password": "psr@108pwd01",
"user_email": "psr@server.com",
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
"user_mobile_no": "966554123456",
"user_is_moderator": false,
"user_status": "active"
}
 */