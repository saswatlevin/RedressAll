import requests
import json
import os
import getpass

def getRequests(url, data):
    response = http_session.get(url, json=data)
    return response

def postRequests(url, data):
    response = http_session.post(url, json=data)
    return response

def putRequests(url, data):
    response = http_session.put(url, json=data)
    return response

def patchRequests(url, data):
    response = http_session.patch(url, json=data)
    return response

def deleteRequests(url, data):
    response = http_session.delete(url, json=data)
    return response

def filePostRequests(url, data, file_path, file_field_name="image"):
    # Validate the file extension before attempting to send it
    allowed_extensions = (".webp", ".jpeg", ".jpg", ".png")
    if not file_path.lower().endswith(allowed_extensions):
        raise ValueError(
            f"Unsupported file type for '{file_path}'. "
            f"Allowed formats: webp, jpeg, jpg, png."
        )

    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"No file found at path: {file_path}")

    # Map extension to the correct MIME type for the multipart request
    extension_to_mime = {
        ".webp": "image/webp",
        ".jpeg": "image/jpeg",
        ".jpg": "image/jpeg",
        ".png": "image/png",
    }
    ext = os.path.splitext(file_path)[1].lower()
    mime_type = extension_to_mime[ext]

    with open(file_path, "rb") as f:
        files = {
            file_field_name: (os.path.basename(file_path), f, mime_type)
        }
        # 'data' holds the non-file form fields (e.g. product_id);
        # passing both 'data' and 'files' makes requests build a
        # multipart/form-data body automatically
        response = requests.post(url, data=data, files=files)

    return response

def testDisplay(test_type, test_number, url, test_name, serial_number, test_data):
    print(test_type)
    print("test_number ", test_number)
    print("url ", url)
    print("test_name ", test_name)
    print("serial_number ", serial_number)
    print("\ntest_data ", test_data)

def userInputFilter(user_input):
    stripped_input = user_input.strip()
    if stripped_input.isdecimal() == True:
        return int(stripped_input)
    else:
        return None

def userMenuDisplay(test_menu_name, test_data):
    test_data_length = len(test_data)
    print(test_menu_name)
    for index in range(0, test_data_length):
        print(str(index + 1) + ". " + test_data[index]['test_name'])


BASE_URL = "http://localhost:3000"

# Create a persistent HTTP session that can retain authentication cookies.
http_session = requests.Session()


def authenticate():
    # Obtain the test user's credentials without displaying the password.
    #email = os.getenv("TEST_USER_EMAIL") or input("Test user email: ")
    #password = os.getenv("TEST_USER_PASSWORD") or getpass.getpass(
    #    "Test user password: "
    #)

    email = input("Test user email: ")
    password = input("Test user password: ")
    


    # Send the credentials to the NestJS sign-in endpoint.
    response = http_session.post(
        f"{BASE_URL}/auth/sign-in",
        json={
            "user_email": email,
            "user_password": password,
        },
        timeout=15,
    )

    # Stop the test run if the server rejects the credentials.
    if response.status_code != 200:
        raise RuntimeError(
            f"Sign-in failed: HTTP {response.status_code}: {response.text}"
        )

    # Parse the JSON response and reject malformed responses.
    try:
        result = response.json()
    except ValueError as exc:
        raise RuntimeError(
            "Sign-in returned an invalid JSON response."
        ) from exc

    # Stop if the server requires an additional MFA step.
    if result.get("mfaRequired"):
        raise RuntimeError(
            "MFA is required; complete the MFA flow before running tests."
        )

    # Verify that the session retained a cookie from the sign-in response.
    if not http_session.cookies:
        raise RuntimeError(
            "Sign-in returned no stored cookies; check the Set-Cookie header."
        )

    # Warn if a Secure cookie cannot be sent over the configured HTTP URL.
    secure_cookies = [
        cookie.name
        for cookie in http_session.cookies
        if cookie.secure
    ]

    if BASE_URL.startswith("http://") and secure_cookies:
        raise RuntimeError(
            f"Secure cookie(s) {', '.join(secure_cookies)} cannot normally "
            "be sent over HTTP; use HTTPS or configure development cookies."
        )

    # Confirm successful authentication before the test menu starts.
    print("Sign-in successful. Session cookie will be reused.")
    return response

def signOut():
    print("Signing out")
    # Send the sign-out request using the authenticated session.
    response = http_session.post(
        f"{BASE_URL}/auth/sign-out",
        timeout=15,
    )

    # Display the result of the sign-out operation.
    print(f"Sign-out status: {response.status_code}")
    return response
