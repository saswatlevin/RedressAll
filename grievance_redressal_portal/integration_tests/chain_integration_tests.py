from request_functions import *
chain_test_data_list = [

    {
        "url": "http://localhost:3000/chains/create_chain",

        "test_name": "Test to check response to empty object in CREATE_CHAIN",

        "test_data": {},

        "serial": 1
    },

    {
        "url": "http://localhost:3000/chains/create_chain",
        
        "test_name": "Test to create a chain with all non-null attributes in CREATE_CHAIN",

        "test_data": {
            
            "chain_name": "Test Chain 3",
            "chain_headquarters_address_room_no": "14",
            "chain_headquarters_address_building": "Test Building 3",
            "chain_headquarters_address_street": "Test Street 3",
            "chain_headquarters_address_city": "Test City Three",
            "chain_headquarters_address_admin_division": "Test Division Three",
            "chain_headquarters_address_country": "India",
            "chain_headquarters_address_post_code": "560003"
        },

        "serial": 2
    },

    {
        "url": "http://localhost:3000/chains/create_chain",
        
        "test_name": "Test to create a chain with an empty chain_name in CREATE_CHAIN",

        "test_data": {
            "chain_name": "",
            "chain_headquarters_address_street": "Test Street",
            "chain_headquarters_address_city": "Test City",
            "chain_headquarters_address_country": "India",
            "chain_headquarters_address_post_code": "560001"
        },

        "serial": 3

    },

    {
        "url": "http://localhost:3000/chains/create_chain",
        
        "test_name": "Test to create a chain with an empty chain_headquarters_address_city in CREATE_CHAIN",

        "test_data": {
            "chain_name": "Test Chain 2",
            "chain_headquarters_address_room_no": "14",
            "chain_headquarters_address_building": "Test Building 2",
            "chain_headquarters_address_city": "",
            "chain_headquarters_address_street": "Test Street 2",
            "chain_headquarters_address_country": "India",
            "chain_headquarters_address_post_code": "560001"
        },

        "serial": 4

    },

    {
        "url": "http://localhost:3000/chains/create_chain",
        
        "test_name": "Test to create a chain with an empty chain_headquarters_address_post_code in CREATE_CHAIN",

        "test_data": {
            "chain_name": "Test Chain 3",
            "chain_headquarters_address_room_no": "16",
            "chain_headquarters_address_building": "Test Building 3",
            "chain_headquarters_address_city": "Test City 3",
            "chain_headquarters_address_street": "Test Street 3",
            "chain_headquarters_address_country": "India",
            "chain_headquarters_address_post_code": ""
        },

        "serial": 5

    },

    {
        "url": "http://localhost:3000/chains/update_chain_name/4",

        "test_name": "Test to check response to empty object in UPDATE_CHAIN_NAME",

        "test_data": {},

        "serial": 6
    },

    {
        "url": "http://localhost:3000/chains/update_chain_name/4",

        "test_name": "Test to update chain_name to a UPDATE TEST CHAIN in UPDATE_CHAIN_NAME",

        "test_data": {
            "chain_name": "1234T"
        },

        "serial": 7
    },

    {
        "url": "http://localhost:3000/chains/update_chain_name/4",

        "test_name": "Test to update chain_name to a UPDATE TEST CHAIN in UPDATE_CHAIN_NAME",

        "test_data": {
            "chain_name": "TES2"
        },

        "serial": 8
    },

    {
        "url": "http://localhost:3000/chains/update_chain_name/4",

        "test_name": "Test to update chain_name to a UPDATE TEST CHAIN in UPDATE_CHAIN_NAME",

        "test_data": {
            "chain_name": "UPDATE3"
        },

        "serial": 9
    },

    {
        "url": "http://localhost:3000/chains/update_chain_name/4",

        "test_name": "Test to update chain_name to Test Chain 1 in UPDATE_CHAIN_NAME",

        "test_data": {
            "chain_name": "Test Chain 1"
        },

        "serial": 10
    },

    {
        "url": "http://localhost:3000/chains/update_chain_name/4",

        "test_name": "Test to update chain_name to 1234 in UPDATE_CHAIN_NAME",

        "test_data": {
            "chain_name": "1234"
        },

        "serial": 11

    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address room_number to 11 in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_room_no": "11"
        },

        "serial": 12
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address room_number to AA in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_room_no": "AA"
        },

        "serial": 13
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address building to TEST BUILDING in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_building": "TEST BUILDING"
        },

        "serial": 14
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address building to 1234T in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_building": "1234T"
        },

        "serial": 15
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address building to TEST1 in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_building": "TEST1"
        },

        "serial": 16
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address building to TEST1 in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_building": "TEST#BUILDING"
        },

        "serial": 17
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address street to TEST STREET in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_street": "TEST STREET"
        },

        "serial": 18
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address street to 1234T in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_street": "1234T"
        },

        "serial": 19
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address street to TEST1 in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_street": "TEST1"
        },

        "serial": 20
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address street to TEST#STREET in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_street": "TEST#STREET"
        },

        "serial": 21
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address city to TEST CITY in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_city": "TEST CITY"
        },

        "serial": 22
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address city to 1234T in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_city": "1234T"
        },

        "serial": 23
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address city to TEST1 in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_city": "TEST1"
        },

        "serial": 24
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address city to TEST#CITY in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_city": "TEST#CITY"
        },

        "serial": 25
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address administrative division to TEST DIVISION in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_admin_division": "TEST DIVISION"
        },

        "serial": 26
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address administrative division to 1234T in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_admin_division": "1234T"
        },

        "serial": 27
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address administrative division to TEST1 in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_admin_division": "TEST1"
        },

        "serial": 28
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address administrative division to TEST#9DIVISION in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_admin_division": "TEST#9DIVISION"
        },

        "serial": 29
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address country to United Arab Emirates in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_country": "United Arab Emirates"
        },

        "serial": 30
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address country to United8Arab Emirates in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_country": "United8Arab Emirates"
        },

        "serial": 31
    },


    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address post code to 123456 in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_post_code": "123456"
        },

        "serial": 32
    },

    {
        "url": "http://localhost:3000/chains/update_chain_address/4",

        "test_name": "Test to update the chain address post code to 123-456 in UPDATE_CHAIN_ADDRESS",

        "test_data": {
            "chain_headquarters_address_post_code": "123-456"
        },

        "serial": 33
    },

    {
        "url": "http://localhost:3000/chains/remove_chain/5",

        "test_name": "Test to delete the chain with chain_id 5 in REMOVE_CHAIN",

        "test_data": {},

        "serial": 34
    }

]


user_input_string = None
user_choice = None
chosen_test_name = None
chosen_test_url = None
chosen_test_data = None
chosen_test_serial = None

test_menu_name = "======CHAIN INTEGRATION TEST MENU======"

while user_choice != 0:
    userMenuDisplay(test_menu_name, chain_test_data_list)

    user_input_string = input("\nChoose a test to run or press 0 to exit ")
    user_choice = userInputFilter(user_input_string)
    
    if user_choice == None:
        print("Only numbers allowed as input!!")
        continue
    
    if user_choice > 25:
        print("The user_choice ", user_choice, " is out of range. Please select a test between serial 1 and 25.")
        continue
    
    test_number = user_choice - 1
    chosen_test_name = chain_test_data_list[test_number]["test_name"]
    chosen_test_url = chain_test_data_list[test_number]["url"]
    chosen_test_data = chain_test_data_list[test_number]["test_data"]
    chosen_test_serial = chain_test_data_list[test_number]["serial"]

    if user_choice >= 1 and user_choice <= 5:
        testDisplay("======CREATE_CHAIN TEST======", test_number, chosen_test_url, chosen_test_name, chosen_test_serial, chosen_test_data)
        response = postRequests(chosen_test_url, chosen_test_data)
        print("\nresponse " + response.text + "\n")
    
    elif user_choice >= 6 and user_choice <= 9:
        testDisplay("======UPDATE_CHAIN_NAME TEST======", test_number, chosen_test_url, chosen_test_name, chosen_test_serial, chosen_test_data)
        response = patchRequests(chosen_test_url, chosen_test_data)
        print("\nresponse " + response.text + "\n")
    
    elif user_choice >= 10 and user_choice <= 23:
        testDisplay("======UPDATE_CHAIN_ADDRESS TEST======", test_number, chosen_test_url, chosen_test_name, chosen_test_serial, chosen_test_data)
        response = patchRequests(chosen_test_url, chosen_test_data)
        print("\nresponse " + response.text + "\n")
    
    elif user_choice >= 24 and user_choice <= 25:
        testDisplay("======REMOVE_CHAIN TEST======", test_number, chosen_test_url, chosen_test_name, chosen_test_serial, chosen_test_data)
        response = deleteRequests(chosen_test_url, chosen_test_data)
        print("\nresponse " + response.text + "\n")
    
    else:     
        if user_choice != 0 and user_choice != None:
            print("User choice out of range.")
            continue
        else:
            print("Exiting...")
            break