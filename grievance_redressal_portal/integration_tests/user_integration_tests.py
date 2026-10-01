from request_functions import *

user_test_data_list = [
    {
        "url": "http://localhost:3000/users/create_user",

        "test_name": "Test to check response to empty object in CREATE_USER",

        "test_data": {},

        "serial": 1
    },

    {
        "url": "http://localhost:3000/users/create_user",

        "test_name": "Test to create a new user using CREATE_USER",

        "test_data": {
            "user_first_name": "SRTFname",
            "user_last_name": "SRTLname",
            "user_password": "srt@108pwd01",
            "user_email": "srt@server.com",
            "user_dob": "1995-04-10",
            "user_role": "restaurant_manager",
            "user_address_room_no": "",
            "user_address_building": "3159",
            "user_address_street": "Dareen Street",
            "user_address_city": "Al Khobar",
            "user_address_admin_division": "Eastern Province",
            "user_address_country": "Saudi Arabia",
            "user_address_post_code": "34446",
            "outlet_id": 6,
            "user_mobile_no": "96651829706",
            "user_is_moderator": True
        },

        "serial": 2
    },

    {
        "url": "http://localhost:3000/users/create_user",

        "test_name": "Test to create a user with duplicate user_mobile_no using CREATE_USER",

        "test_data": {
            "user_first_name": "KIOFname",
            "user_last_name": "KIOLname",
            "user_password": "kio@108pwd01",
            "user_email": "kio@server.com",
            "user_dob": "1991-05-12",
            "user_role": "chain_manager",
            "user_address_room_no": "",
            "user_address_building": "3206",
            "user_address_street": "Dareen Street",
            "user_address_city": "Al Khobar",
            "user_address_admin_division": "Eastern Province",
            "user_address_country": "Saudi Arabia",
            "user_address_post_code": "34446",
            "outlet_id": 2,
            "user_mobile_no": "96651829706"
        },

        "serial": 3
    },

    {
        "url": "http://localhost:3000/users/create_user",

        "test_name": "Test to create a user with NULL user_first_name using CREATE_USER",

        "test_data": {
            "user_first_name": None,
            "user_last_name": "KIOLname",
            "user_password": "kio@108pwd01",
            "user_email": "kio@server.com",
            "user_dob": "1991-05-12",
            "user_role": "chain_manager",
            "user_address_room_no": "",
            "user_address_building": "3206",
            "user_address_street": "Dareen Street",
            "user_address_city": "Al Khobar",
            "user_address_admin_division": "Eastern Province",
            "user_address_country": "Saudi Arabia",
            "user_address_post_code": "34446",
            "outlet_id": 2,
            "user_mobile_no": "96651829716"
        },

        "serial": 4
    },


    {
        "url": "http://localhost:3000/users/create_user",

        "test_name": "Test to create a user with NULL user_last_name using CREATE_USER",

        "test_data": {
            "user_first_name": "KIOFname",
            "user_last_name": None,
            "user_password": "kio@108pwd01",
            "user_email": "kio@server.com",
            "user_dob": "1991-05-12",
            "user_role": "restaurant_manager",
            "user_address_room_no": "",
            "user_address_building": "3206",
            "user_address_street": "Dareen Street",
            "user_address_city": "Al Khobar",
            "user_address_admin_division": "Eastern Province",
            "user_address_country": "Saudi Arabia",
            "user_address_post_code": "34446",
            "outlet_id": 2,
            "user_mobile_no": "96651829726"
        },

        "serial": 5
    },

    {
        "url": "http://localhost:3000/users/create_user",

        "test_name": "Test to create a user with NULL outlet_id using CREATE_USER",

        "test_data": {
            "user_first_name": "OLSFname",
            "user_last_name": None,
            "user_password": "ols@108pwd01",
            "user_email": "ols@server.com",
            "user_dob": "1992-05-12",
            "user_role": "restaurant_manager",
            "user_address_room_no": "",
            "user_address_building": "3216",
            "user_address_street": "Al-dar Street",
            "user_address_city": "Al Khobar",
            "user_address_admin_division": "Eastern Province",
            "user_address_country": "Saudi Arabia",
            "user_address_post_code": "34446",
            "outlet_id": None,
            "user_mobile_no": "96651829736"
        },

        "serial": 6
    },

    {
        "url": "http://localhost:3000/users/update_user_name/1",

        "test_name": "Test to check response to empty object in UPDATE_USER_NAME",

        "test_data": {},

        "serial": 7
    },

    {
        "url": "http://localhost:3000/users/update_user_name/19",

        "test_name": "Test to update the user_first_name of user with user_id 19 to TEST_FIRST_NAME using UPDATE_USER_NAME",

        "test_data": {
            "user_first_name": "TEST_FIRST_NAME"
        },

        "serial": 8
    },

    {
        "url": "http://localhost:3000/users/update_user_name/19",

        "test_name": "Test to update the user_first_name of user with user_id 19 to NULL using UPDATE_USER_NAME",

        "test_data": {
            "user_first_name": None
        },

        "serial": 9
    },

    {
        "url": "http://localhost:3000/users/update_user_name/19",

        "test_name": "Test to update the user_last_name of user with user_id 19 from NULL to TEST_LAST_NAME using UPDATE_USER_NAME",

        "test_data": {
            "user_first_name": "TEST_LAST_NAME"
        },

        "serial": 10
    },

    {
        "url": "http://localhost:3000/users/update_user_role/1",

        "test_name": "Test to check response to empty object in UPDATE_USER_ROLE",

        "test_data": {},

        "serial": 11
    },

    {
        "url": "http://localhost:3000/users/update_user_role/19",

        "test_name": "Test to change the user_role of user with user_id 19 to company_manager in UPDATE_USER_ROLE",

        "test_data": {
            "user_role": "company_manager"
        },

        "serial": 12
    },

    {
        "url": "http://localhost:3000/users/update_user_role/21",

        "test_name": "Test to change the user_role of user with user_id 21 to NULL in UPDATE_USER_ROLE",

        "test_data": {
            "user_role": None
        },

        "serial": 13
    },

    {
        "url": "http://localhost:3000/users/update_user_role/21",

        "test_name": "Test to change the user_role of user with user_id 21 to TEST_ROLE in UPDATE_USER_ROLE",

        "test_data": {
            "user_role": "TEST_ROLE"
        },

        "serial": 14
    },

    {
        "url": "http://localhost:3000/users/update_user_password/1",

        "test_name": "Test to check response to an empty object in UPDATE_USER_PASSWORD",

        "test_data": {},

        "serial": 15
    },

    {
        "url": "http://localhost:3000/users/update_user_password/19",

        "test_name": "Test to create a password for user with user_id 19 in UPDATE_USER_PASSWORD",

        "test_data": {
            "user_password": "pwD@10230129"
        },

        "serial": 16
    },

    {
        "url": "http://localhost:3000/users/update_user_password/1",

        "test_name": "Test Test to create a password with the ? character for user with user_id 19 in UPDATE_USER_PASSWORD",

        "test_data": {
            "user_password": "pwD?10230129"
        },

        "serial": 17
    },

    {
        "url": "http://localhost:3000/users/update_user_status/1",

        "test_name": "Test to check response to an empty object in UPDATE_USER_STATUS",

        "test_data": {},

        "serial": 18
    },

    {
        "url": "http://localhost:3000/users/update_user_status/19",

        "test_name": "Test to change the user_status of user with user_id 19 to suspended in UPDATE_USER_STATUS",

        "test_data": {
            "user_status": "suspended"
        },

        "serial": 19
    },

    {
        "url": "http://localhost:3000/users/update_user_status/21",

        "test_name": "Test to change the user_status of user with user_id 21 to NULL in UPDATE_USER_STATUS",

        "test_data": {
            "user_status": None
        },

        "serial": 20
    },

    {
        "url": "http://localhost:3000/users/update_user_status/21",

        "test_name": "Test to change the user_status of user with user_id 21 to TEST_STATUS in UPDATE_USER_STATUS",

        "test_data": {
            "user_status": "TEST_STATUS"
        },

        "serial": 21
    },

    {
        "url": "http://localhost:3000/users/update_user_status/21",

        "test_name": "Test to change the user_status of user with user_id 21 to TEST_STATUS in UPDATE_USER_STATUS",

        "test_data": {
            "user_status": "TEST_STATUS"
        },

        "serial": 22
    },

    {
        "url": "http://localhost:3000/users/update_user_email/1",

        "test_name": "Test to check response to an empty object in UPDATE_USER_EMAIL",

        "test_data": {},

        "serial": 23
    },

    {
        "url": "http://localhost:3000/users/update_user_email/19",

        "test_name": "Test to update the user_email to smallAndCaptialLetter01@abc.com of user with user_id 19 in UPDATE_USER_EMAIL",

        "test_data": {
            "user_email": "smallAndCaptialLetter01@abc.com"
        },

        "serial": 24
    },

    {
        "url": "http://localhost:3000/users/update_user_email/19",

        "test_name": "Test to update the user_email to smallAndCaptialLetter01@abc.com of user with user_id 19 in UPDATE_USER_EMAIL",

        "test_data": {
            "user_email": "smallAndCaptialLetter01@abc.com"
        },

        "serial": 25
    },

    {
        "url": "http://localhost:3000/users/update_user_email/21",

        "test_name": "Test to update the user_email to smallAndCaptialLetter?01@abc.com of user with user_id 21 in UPDATE_USER_EMAIL",

        "test_data": {
            "user_email": "smallAndCaptialLetter?01@abc.com"
        },

        "serial": 26
    },

    {
        "url": "http://localhost:3000/users/update_user_email/21",

        "test_name": "Test to update the user_email to NULL of user with user_id 21 in UPDATE_USER_EMAIL",

        "test_data": {
            "user_email": None
        },

        "serial": 27
    },

    {
        "url": "http://localhost:3000/users/update_user_outletid/1",

        "test_name": "Test to check response to an empty object in UPDATE_USER_OUTLETID",

        "test_data": {},

        "serial": 28
    },

    {
        "url": "http://localhost:3000/users/update_user_outletid/19",

        "test_name": "Test to update the outlet_id to NULL of user with user_id 19 in UPDATE_USER_OUTLETID",

        "test_data": {
            "outlet_id": None
        },

        "serial": 29
    },

    {
        "url": "http://localhost:3000/users/update_user_outletid/21",

        "test_name": "Test to update the outlet_id to 8 of user with user_id 21 in UPDATE_USER_OUTLETID",

        "test_data": {
            "outlet_id": 8
        },

        "serial": 30
    },

    {
        "url": "http://localhost:3000/users/update_user_outletid/21",

        "test_name": "Test to update the outlet_id to 10 (non-existent outlet) of user with user_id 21 in UPDATE_USER_OUTLETID",

        "test_data": {
            "outlet_id": 10
        },

        "serial": 31
    },


    {
        "url": "http://localhost:3000/users/search_users_by_name",

        "test_name": "Test to check response to an empty object in SEARCH_USERS_BY_NAME",

        "test_data": {},

        "serial": 32
    },

    {
        "url": "http://localhost:3000/users/search_users_by_name",

        "test_name": "Test to search for a user with user_first_name D, user_last_name D in SEARCH_USERS_BY_NAME",

        "test_data": {
            "user_first_name": "D",
            "user_last_name": "D"
        },

        "serial": 33
    },

    {
        "url": "http://localhost:3000/users/search_users_by_name",

        "test_name": "Test to search for a user with user_first_name DE, user_last_name DE in SEARCH_USERS_BY_NAME",

        "test_data": {
            "user_first_name": "DE",
            "user_last_name": "DE"
        },

        "serial": 34
    },

    {
        "url": "http://localhost:3000/users/search_users_by_name",

        "test_name": "Test to search for a user with user_first_name DEF, user_last_name DEF in SEARCH_USERS_BY_NAME",

        "test_data": {
            "user_first_name": "DEF",
            "user_last_name": "DEF"
        },

        "serial": 35
    },

    {
        "url": "http://localhost:3000/users/search_users_by_name",

        "test_name": "Test to search for a user with user_first_name DEF, user_last_name NULL in SEARCH_USERS_BY_NAME",

        "test_data": {
            "user_first_name": "DEF",
            "user_last_name": None
        },

        "serial": 36
    },

    {
        "url": "http://localhost:3000/users/search_users_by_name",

        "test_name": "Test to search for a user with user_first_name def, user_last_name def in SEARCH_USERS_BY_NAME",

        "test_data": {
            "user_first_name": "def",
            "user_last_name": "def"
        },

        "serial": 37
    },

    {
        "url": "http://localhost:3000/users/search_users_by_name",

        "test_name": "Test to search for a user with user_first_name E, user_last_name E in SEARCH_USERS_BY_NAME",

        "test_data": {
            "user_first_name": "E",
            "user_last_name": "E"
        },

        "serial": 38
    },

    {
        "url": "http://localhost:3000/users/search_users_by_name",

        "test_name": "Test to search for a user with user_first_name EF, user_last_name EF in SEARCH_USERS_BY_NAME",

        "test_data": {
            "user_first_name": "EF",
            "user_last_name": "EF"
        },

        "serial": 39
    },

    {
        "url": "http://localhost:3000/users/search_users_by_name",

        "test_name": "Test to search for a user with user_first_name EFD, user_last_name EFD in SEARCH_USERS_BY_NAME",

        "test_data": {
            "user_first_name": "EFD",
            "user_last_name": "EFD"
        },

        "serial": 40
    },

    {
        "url": "http://localhost:3000/users/find_one_user/5",

        "test_name": "Test to search for a user with user_id 5 in FIND_ONE_USER",

        "test_data": {},

        "serial": 41
    },

    {
        "url": "http://localhost:3000/users/find_one_user/22",

        "test_name": "Test to search for a user with user_id 22 in FIND_ONE_USER",

        "test_data": {},

        "serial": 42
    },

    {
        "url": "http://localhost:3000/users/find_one_user/aa",

        "test_name": "Test to search for a user with user_id aa in FIND_ONE_USER",

        "test_data": {},

        "serial": 43
    },

    {
        "url": "http://localhost:3000/users/remove_user/5",

        "test_name": "Test to search for a user with user_id 5 in REMOVE_USER",

        "test_data": {},

        "serial": 44
    },

    {
        "url": "http://localhost:3000/users/remove_user/22",

        "test_name": "Test to search for a user with user_id 22 in REMOVE_USER",

        "test_data": {},

        "serial": 45
    },

    {
        "url": "http://localhost:3000/users/remove_user/aa",

        "test_name": "Test to search for a user with user_id aa in REMOVE_USER",

        "test_data": {},

        "serial": 46
    },

    {
        "url": "http://localhost:3000/users/update_user_address/1",

        "test_name": "Test to check response to an empty object in UPDATE_USER_ADDRESS",

        "test_data": {},

        "serial": 47
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_room_no to 11 for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_room_no": "11"
        },

        "serial": 48
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_building to TEST BUiLDING for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_building": "TEST BUiLDING"
        },

        "serial": 49
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_building to TEST/_.'0BUiLDING for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_building": "TEST/_.'0BUiLDING"
        },

        "serial": 50
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_building to /_.' for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_building": "/_.'0"
        },

        "serial": 51
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_street to TEST STReET for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_street": "TEST STReET"
        },

        "serial": 52
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_street to TEST/_.'0STReET for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_street": "TEST/_.'0STReET"
        },

        "serial": 53
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_street to /_.'0 for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_street": "/_.'0"
        },

        "serial": 54
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_city to TEST CiTY for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_city": "TEST CiTY"
        },

        "serial": 55
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_city to TEST/_.'CiTY for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_street": "TEST/_.'CiTY"
        },

        "serial": 56
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_city to /_.' for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_street": "/_.'"
        },

        "serial": 57
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_city to TEST CiTY for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_city": "TEST CiTY"
        },

        "serial": 58
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_city to TEST/_.'CiTY for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_city": "TEST/_.'CiTY"
        },

        "serial": 59
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_city to /_.' for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_city": "/_.'"
        },

        "serial": 60
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_admin_division to TEST ADMiN DIv for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_admin_division": "TEST ADMiN DIv"
        },

        "serial": 61
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_admin_division to TEST/_.'ADMiN DIv for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_admin_division": "TEST/_.'ADMiN DIv"
        },

        "serial": 62
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_admin_division to /_.' for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_admin_division": "/_.'"
        },

        "serial": 63
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_country to United Arab Emirates for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_admin_country": "United Arab Emirates"
        },

        "serial": 64
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_country to United8Arab Emirates for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_admin_country": "United8Arab Emirates"
        },

        "serial": 65
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_post_code to SWA 1AA for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_admin_post_code": "SWA 1AA"
        },

        "serial": 66
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_post_code to 100-0001 for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_admin_post_code": "100-0001"
        },

        "serial": 67
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_post_code to 123-45-6789 for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_admin_post_code": "123-45-6789"
        },

        "serial": 68
    },

    {
        "url": "http://localhost:3000/users/update_user_address/19",

        "test_name": "Test to update the user_address_post_code to --------- for user with user_id 19 in UPDATE_USER_ADDRESS",

        "test_data": {
            "user_address_admin_post_code": "----------"
        },

        "serial": 69
    },

    {
        "url": "http://localhost:3000/users/update_user_mobile_no/1",

        "test_name": "Test to check response to an empty object in UPDATE_USER_MOBILE_NO",

        "test_data": {},

        "serial": 70
    },

    {
        "url": "http://localhost:3000/users/update_user_mobile_no/19",

        "test_name": "Test to update user_mobile_no of user with user_id 19 to +966551234567 in UPDATE_USER_MOBILE_NO",

        "test_data": {
            "user_mobile_no": "+966551234567"
        },

        "serial": 71
    },

    {
        "url": "http://localhost:3000/users/update_user_mobile_no/19",

        "test_name": "Test to update user_mobile_no of user with user_id 19 to +9665512345 un UPDATE_USER_MOBILE_NO",

        "test_data": {
            "user_mobile_no": "+9665512345"
        },

        "serial": 72
    },
    
    {
        "url": "http://localhost:3000/users/update_user_is_moderator/1",

        "test_name": "Test to check response to an empty object in UPDATE_USER_IS_MODERATOR",

        "test_data": {},

        "serial": 73
    },

    {
        "url": "http://localhost:3000/users/update_user_is_moderator/19",

        "test_name": "Test to update user_is_moderator to true for user with user_id 19 in UPDATE_USER_IS_MODERATOR",

        "test_data": {
            "user_is_moderator": True
        },

        "serial": 74
    },

    {
        "url": "http://localhost:3000/users/update_user_is_moderator/19",

        "test_name": "Test to update user_is_moderator to NULL for user with user_id 19 in UPDATE_USER_IS_MODERATOR",

        "test_data": {
            "user_is_moderator": None
        },

        "serial": 75
    }
]