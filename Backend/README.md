# API Documentation: User

## Description

The `/users/register` endpoint is used to create a new user in the system. This endpoint expects a JSON payload with user details, validates the input, creates the user, and then returns the created user along with an authentication token.

## Endpoint Details

- **Method:** POST
- **URL:** `/api/v1/users/register`

## Request Body

The request body should be in JSON format and must include the following fields:

- **email** (string):  
  Must be a valid email address.

- **fullname** (object):  
  An object containing:
  - **firstname** (string):  
    Must be at least 4 characters long.
  - **lastname** (string):  
    Must be at least 4 characters long.

- **password** (string):  
  Must be at least 8 characters long.

### Example Request

```json
{
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "yourpassword"
}
```

## Response

### Success

- **Status Code:** 201 Created
- **Response Body:**  
  A JSON object containing:
  - **user:** The created user object.
  - **token:** A JWT token for the authenticated session.

### Validation Errors

- **Status Code:** 400 Bad Request
- **Response Body:**  
  A JSON object with an `errors` array detailing the validation errors.

### Example Error Response

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First Name must be at least 4 characters long", "param": "fullname.firstname", "location": "body" }
  ]
}
```

## Notes

- Ensure that all required fields are provided in the correct format.
- The endpoint uses `express-validator` for request validation.
- On success, a JWT token is generated and provided to the client for subsequent authenticated requests.



## `/users/register` Endpoint

### Description

The `/users/register` endpoint is used to create a new user in the system. This endpoint expects a JSON payload with user details, validates the input, creates the user, and then returns the created user along with an authentication token.

### Endpoint Details

- **Method:** POST
- **URL:** `/api/v1/users/register`

### Request Body

The request body should be in JSON format and must include the following fields:

- **email** (string):  
  Must be a valid email address.

- **fullname** (object):  
  An object containing:
  - **firstname** (string):  
    Must be at least 4 characters long.
  - **lastname** (string):  
    Must be at least 4 characters long.

- **password** (string):  
  Must be at least 8 characters long.

#### Example Request

```json
{
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "yourpassword"
}
```

### Response

#### Success

- **Status Code:** 201 Created
- **Response Body:**  
  A JSON object containing:
  - **user:** The created user object.
  - **token:** A JWT token for the authenticated session.

#### Validation Errors

- **Status Code:** 400 Bad Request
- **Response Body:**  
  A JSON object with an `errors` array detailing the validation errors.

#### Example Error Response

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First Name must be at least 4 characters long", "param": "fullname.firstname", "location": "body" }
  ]
}
```

---

## `/users/login` Endpoint

### Description

The `/users/login` endpoint is used to authenticate an existing user. The endpoint validates the provided credentials and, if correct, returns the user information along with a JWT token.

### Endpoint Details

- **Method:** POST
- **URL:** `/api/v1/users/login`

### Request Body

The request body should be in JSON format and must include the following fields:

- **email** (string):  
  Must be a valid email address.

- **password** (string):  
  Must be at least 8 characters long.

#### Example Request

```json
{
  "email": "example@example.com",
  "password": "yourpassword"
}
```

### Response

#### Success

- **Status Code:** 200 OK
- **Response Body:**  
  A JSON object containing:
  - **user:** The authenticated user object.
  - **token:** A JWT token for the authenticated session.

#### Validation Errors

- **Status Code:** 400 Bad Request
- **Response Body:**  
  A JSON object with an `errors` array detailing the validation errors.

#### Authentication Errors

- **Status Code:** 401 Unauthorized
- **Response Body:**  
  A JSON object with an `error` property indicating "Invalid Email or Password".

#### Example Error Response

```json
{
  "error": "Invalid Email or Password"
}
```

### Notes

- Ensure that all required fields are provided in the correct format.
- The endpoint uses `express-validator` for request validation.
- On success, a JWT token is generated and provided to the client for subsequent authenticated requests.


---

## `/users/profile` Endpoint

### Description

The `/users/profile` endpoint retrieves the profile information of the authenticated user. It requires a valid JWT token to access the endpoint. The token must be either provided as a cookie named `token` or in the `Authorization` header in the format `Bearer <token>`. The authentication middleware (`authUser`) validates the token and attaches the user data to the request.

### Endpoint Details

- **Method:** GET  
- **URL:** `/api/v1/users/profile`

### Request

- **Authentication:**  
  Required. Include the JWT token either as a cookie (`token`) or in the `Authorization` header.
- **Body:**  
  No request body is needed.

### Response

#### Success

- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object containing the authenticated user's profile data.
  
  **Example:**
  ```json
  {
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields...
    }
  }
  ```

#### Error

- **Status Code:** 401 Unauthorized  
  Returned if the JWT token is missing, invalid, or expired.

---

## `/users/logout` Endpoint

### Description

The `/users/logout` endpoint logs out the authenticated user. It clears the authentication token from the client (by clearing the `token` cookie) and blacklists the token to prevent further use.

### Endpoint Details

- **Method:** GET  
- **URL:** `/api/v1/users/logout`

### Request

- **Authentication:**  
  Required. Include the JWT token either as a cookie (`token`) or in the `Authorization` header.
- **Body:**  
  No request body is needed.

### Response

#### Success

- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object with a confirmation message.
  
  **Example:**
  ```json
  {
    "message": "User logged out"
  }
  ```

#### Error

- **Status Code:** 401 Unauthorized  
  Returned if the JWT token is missing, invalid, or expired.


# API Documentation: Captain Endpoints

---

## `/captains/register` Endpoint

### Description

The `/captains/register` endpoint is used to create a new captain in the system. This endpoint expects a JSON payload with captain details, including personal information and vehicle details. It validates the input, creates the captain, and returns the newly created captain along with an authentication token.

### Endpoint Details

- **Method:** POST  
- **URL:** `/api/v1/captains/register`

### Request Body

The request body should be in JSON format and must include the following fields:

- **email** (string):  
  Must be a valid email address.

- **fullname** (object):  
  An object containing:
  - **firstname** (string): Must be at least 4 characters long.
  - **lastname** (string): Must be at least 4 characters long.

- **password** (string):  
  Must be at least 8 characters long.

- **vehicle** (object):  
  An object containing:
  - **color** (string): Must be at least 3 characters long.
  - **plate** (string): Must be at least 3 characters long.
  - **vehicleType** (string): Must be one of the following values: `car`, `motorcycle`, `auto`.
  - **capacity** (string): Must be provided (at least 1 character, typically a numeric value in string format).

#### Example Request

```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Jack",
    "lastname": "Sparrow"
  },
  "password": "secret123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "vehicleType": "car",
    "capacity": "4"
  }
}
```

### Response

#### Success

- **Status Code:** 201 Created
- **Response Body:**  
  A JSON object containing:
  - **captain:** The created captain object.
  - **token:** A JWT token for the authenticated session.

#### Validation & Existence Errors

- **Status Code:** 400 Bad Request  
- **Response Body:**  
  A JSON object with an `errors` array if validation fails or an `error` property if the captain already exists.

---

## `/captains/login` Endpoint

### Description

The `/captains/login` endpoint is used to authenticate an existing captain. It validates the provided credentials and, if correct, returns the captain's information along with a JWT token.  
**Note:** While login requests are typically sent as POST, the current implementation uses a GET request that expects a JSON body.

### Endpoint Details

- **Method:** GET  
- **URL:** `/api/v1/captains/login`

### Request Body

The request body should be in JSON format and must include the following fields:

- **email** (string):  
  Must be a valid email address.

- **password** (string):  
  Must be at least 8 characters long.

#### Example Request

```json
{
  "email": "captain@example.com",
  "password": "secret123"
}
```

### Response

#### Success

- **Status Code:** 200 OK
- **Response Body:**  
  A JSON object containing:
  - **captain:** The authenticated captain object.
  - **token:** A JWT token for the authenticated session.

#### Validation & Authentication Errors

- **Status Code:** 400 Bad Request  
  Returned if there are validation errors in the request.

- **Status Code:** 401 Unauthorized  
  Returned if the email is not found or the password does not match.

#### Example Error Response

```json
{
  "error": "Invalid Email or Password"
}
```

---

## `/captains/profile` Endpoint

### Description

The `/captains/profile` endpoint retrieves the profile information of the authenticated captain. Authentication is required for this endpoint. The JWT token must be provided either as a cookie named `token` or in the `Authorization` header formatted as `Bearer <token>`. The authentication middleware (`authCaptain`) validates the token and attaches the captain data to the request.

### Endpoint Details

- **Method:** GET  
- **URL:** `/api/v1/captains/profile`

### Request

- **Authentication:**  
  Required. Include the JWT token either as a cookie (`token`) or in the `Authorization` header.
- **Body:**  
  No request body is required.

### Response

#### Success

- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object containing the authenticated captain’s profile data.

  **Example:**
  ```json
  {
    "captain": {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ1234",
        "vehicleType": "car",
        "capacity": "4"
      }
      // ... other captain fields ...
    }
  }
  ```

#### Error

- **Status Code:** 401 Unauthorized  
  Returned if the JWT token is missing, invalid, or expired.

---

## `/captains/logout` Endpoint

### Description

The `/captains/logout` endpoint logs out the authenticated captain. It clears the authentication token from the client (by clearing the `token` cookie) and blacklists the token to prevent any further use.

### Endpoint Details

- **Method:** GET  
- **URL:** `/api/v1/captains/logout`

### Request

- **Authentication:**  
  Required. Include the JWT token either as a cookie (`token`) or in the `Authorization` header.
- **Body:**  
  No request body is required.

### Response

#### Success

- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object with a confirmation message.

  **Example:**
  ```json
  {
    "message": "Captain logged out successfully"
  }
  ```

#### Error

- **Status Code:** 401 Unauthorized  
  Returned if the JWT token is missing, invalid, or expired.