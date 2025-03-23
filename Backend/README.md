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



  # API Documentation: Maps Service

This document provides details on all the maps endpoints available within the application. These endpoints interact with the Google Maps API to provide functionalities such as retrieving coordinates, calculating distance & time between two points, and fetching location suggestions.

---

## 1. `/maps/get-coordinates` Endpoint

### Description
Retrieves the latitude and longitude for a given address by calling the Google Maps Geocoding API.

### Endpoint Details
- **Method:** GET  
- **URL:** `/api/v1/maps/get-coordinates`

### Request Parameters
- **Query Parameter:** `address` (string, min length: 3)  
  The address for which to fetch coordinates.

### Example Request
```
GET /api/v1/maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
```

### Responses

#### Success
- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object containing the latitude and longitude.
  ```json
  {
    "lat": 37.4224764,
    "lng": -122.0842499
  }
  ```

#### Errors
- **Status Code:** 400 Bad Request  
  When the `address` parameter is missing or does not meet the validation criteria.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid value",
        "param": "address",
        "location": "query"
      }
    ]
  }
  ```
- **Status Code:** 404 Not Found  
  When no coordinates could be fetched for the given address.
  ```json
  {
    "message": "Coordinate not found"
  }
  ```
- **Status Code:** 500 Internal Server Error  
  When an error occurs while calling the Google Maps API.
  ```json
  {
    "error": "Failed to fetch coordinates. Please try again later."
  }
  ```

---

## 2. `/maps/get-distance-time` Endpoint

### Description
Calculates the distance and estimated travel time between two points (origin and destination) using the Google Maps Distance Matrix API.

### Endpoint Details
- **Method:** GET  
- **URL:** `/api/v1/maps/get-distance-time`

### Request Parameters
- **Query Parameters:**
  - `origin` (string, min length: 3): The starting point.  
  - `destination` (string, min length: 3): The destination point.

### Example Request
```
GET /api/v1/maps/get-distance-time?origin=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

### Responses

#### Success
- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object containing distance and duration details.
  ```json
  {
    "distance": {
      "text": "15.3 km",
      "value": 15300
    },
    "duration": {
      "text": "20 mins",
      "value": 1200
    },
    "status": "OK"
  }
  ```

#### Errors
- **Status Code:** 400 Bad Request  
  When `origin` or `destination` parameters are missing or invalid.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid value",
        "param": "origin",
        "location": "query"
      },
      {
        "msg": "Invalid value",
        "param": "destination",
        "location": "query"
      }
    ]
  }
  ```
- **Status Code:** 404 Not Found  
  When no distance/time result is found.
  ```json
  {
    "message": "Distance and time not found"
  }
  ```
- **Status Code:** 500 Internal Server Error  
  When an error occurs while fetching data from the Google Maps API.
  ```json
  {
    "error": "Failed to fetch distance and time. Please try again later."
  }
  ```

---

## 3. `/maps/get-suggestion` Endpoint

### Description
Provides autocomplete suggestions for an address input using the Google Maps Places Autocomplete API.

### Endpoint Details
- **Method:** GET  
- **URL:** `/api/v1/maps/get-suggestion`

### Request Parameters
- **Query Parameter:** `input` (string, min length: 3)  
  The partial address string for which suggestions are needed.

### Example Request
```
GET /api/v1/maps/get-suggestion?input=1600+Am
```

### Responses

#### Success
- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON array of suggestion objects as returned by the Google Maps API. For example:
  ```json
  [
    {
      "description": "1600 Amphitheatre Parkway, Mountain View, CA, USA",
      "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA"
    },
    {
      "description": "1600 Amphitheatre Pkwy, Mountain View, CA, USA",
      "place_id": "ChIJd8BlQ2BZwokRAFUEcm_qrcA"
    }
  ]
  ```

#### Errors
- **Status Code:** 400 Bad Request  
  When the `input` parameter is missing or invalid.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid value",
        "param": "input",
        "location": "query"
      }
    ]
  }
  ```
- **Status Code:** 404 Not Found  
  When suggestions could not be found.
  ```json
  {
    "message": "Suggestion not found"
  }
  ```
- **Status Code:** 500 Internal Server Error  
  When an error occurs while calling the Google Maps API.
  ```json
  {
    "error": "Failed to fetch suggestions. Please try again later."
  }
  ```

---

### Notes for All Endpoints
- **Authentication:**  
  All the maps endpoints require authentication. Include the JWT token as a cookie (`token`) or in the `Authorization` header with the format `Bearer <token>`.
  
- **Validation:**  
  The endpoints validate incoming query parameters using `express-validator`. Ensure that the parameters meet the required criteria (e.g., minimum length).

- **API Key:**  
  These endpoints leverage the Google Maps API. Make sure your Google Maps API key is valid and has the necessary permissions.

- **Usage Example with Axios:**  
  ```javascript
  // Example request using axios for /maps/get-coordinates:
  axios.get('/api/v1/maps/get-coordinates', {
    params: { address: '1600 Amphitheatre Parkway, Mountain View, CA' },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
  ```

---



# API Documentation: Ride Service

This document provides details on all the ride endpoints available within the application. These endpoints allow users to create ride requests and calculate fare estimates based on the pickup and destination locations.

> **Note:** All ride endpoints require authentication. Include the JWT token as a cookie (`token`) or in the `Authorization` header using the format `Bearer <token>`.

---

## 1. `/rides/create` Endpoint

### Description
Creates a new ride request for the authenticated user. Upon receiving valid ride details, the endpoint creates a new ride record in the database and returns the created ride object.

### Endpoint Details
- **Method:** POST  
- **URL:** `/api/v1/rides/create`

### Request Body
The request body must be in JSON format and include the following fields:
- **pickup** (string):  
  The pickup location. Must be at least 3 characters in length.
- **destination** (string):  
  The destination location. Must be at least 3 characters in length.
- **vehicleType** (string):  
  The type of vehicle required for the ride. Allowed values: `"car"`, `"motorcycle"`, `"auto"`.

#### Example Request Body
```json
{
  "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
  "destination": "1 Infinite Loop, Cupertino, CA",
  "vehicleType": "car"
}
```

### Responses

#### Success
- **Status Code:** 201 Created  
- **Response Body:**  
  A JSON object representing the newly created ride.
  ```json
  {
    "_id": "608c1912fc13ae1a44000001",
    "user": "607f1f77bcf86cd799439011",
    "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA",
    "vehicleType": "car",
    "fare": 45.5,
    "otp": 123456,
    "createdAt": "2025-03-20T12:00:00.000Z",
    "updatedAt": "2025-03-20T12:00:00.000Z"
  }
  ```

#### Validation Errors
- **Status Code:** 400 Bad Request  
- **Response Body:**  
  A JSON object with an `errors` array describing validation issues.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid pickup location",
        "param": "pickup",
        "location": "body"
      },
      {
        "msg": "Invalid destination location",
        "param": "destination",
        "location": "body"
      },
      {
        "msg": "Invalid vehicle type",
        "param": "vehicleType",
        "location": "body"
      }
    ]
  }
  ```

#### Server Errors
- **Status Code:** 500 Internal Server Error  
- **Response Body:**  
  A JSON object indicating that an unexpected error occurred.
  ```json
  {
    "message": "An unexpected error occurred. Please try again later."
  }
  ```

---

## 2. `/rides/get-fare` Endpoint

### Description
Calculates and returns the fare for a ride based on the provided pickup and destination locations. The fare is computed using distance, duration, and applicable rate parameters for the different vehicle types.

### Endpoint Details
- **Method:** POST  
- **URL:** `/api/v1/rides/get-fare`

### Request Parameters
This endpoint accepts the data as query parameters:
- **pickup** (string):  
  The pickup location. Must be at least 3 characters in length.
- **destination** (string):  
  The destination location. Must be at least 3 characters in length.

#### Example Request URL
```
POST /api/v1/rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

### Responses

#### Success
- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object containing fare estimates for each vehicle type.
  ```json
  {
    "auto": 25.0,
    "car": 45.5,
    "motorcycle": 18.0
  }
  ```

#### Validation Errors
- **Status Code:** 400 Bad Request  
- **Response Body:**  
  A JSON object with an `errors` array if required parameters are missing or invalid.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid pickup location",
        "param": "pickup",
        "location": "query"
      },
      {
        "msg": "Invalid destination location",
        "param": "destination",
        "location": "query"
      }
    ]
  }
  ```

#### Server Errors
- **Status Code:** 500 Internal Server Error  
- **Response Body:**  
  A JSON object indicating that an unexpected error occurred during fare calculation.
  ```json
  {
    "message": "An unexpected error occurred. Please try again later."
  }
  ```

---

### Usage Example with Axios

```javascript
// Example for /rides/create
axios.post('/api/v1/rides/create', {
  pickup: '1600 Amphitheatre Parkway, Mountain View, CA',
  destination: '1 Infinite Loop, Cupertino, CA',
  vehicleType: 'car'
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));

// Example for /rides/get-fare
axios.post('/api/v1/rides/get-fare', null, {
  params: {
    pickup: '1600 Amphitheatre Parkway, Mountain View, CA',
    destination: '1 Infinite Loop, Cupertino, CA'
  },
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

---

### Summary Notes
- **Authentication:** All endpoints require a valid JWT token for access.
- **Input Validation:** Query parameters and JSON body fields are validated using `express-validator`. Ensure that all required fields are provided and meet the minimum length and allowed values.
- **Error Handling:** The API returns proper error messages for validation errors (400), missing data (404), or server issues (500).

---
## 3. `/rides/confirm` Endpoint

### Description
This endpoint allows a captain to confirm a ride request. It validates the ride ID provided in the request body and, upon success, assigns the captain to the ride and changes its status to "accepted". Once confirmed, the user is notified about the ride confirmation.

### Endpoint Details
- **Method:** POST  
- **URL:** `/api/v1/rides/confirm`

### Request Body
The request body must be in JSON format and include:
- **rideId** (string): The unique identifier of the ride to be confirmed.

#### Example Request Body
```json
{
  "rideId": "608c1912fc13ae1a44000001"
}
```

### Responses

#### Success
- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object representing the confirmed ride with updated status and assigned captain.
  ```json
  {
    "_id": "608c1912fc13ae1a44000001",
    "user": "607f1f77bcf86cd799439011",
    "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA",
    "vehicleType": "car",
    "fare": 45.5,
    "status": "accepted",
    "captain": "60a1f2b3c4d5e6f789012345",
    "otp": 123456,
    "createdAt": "2025-03-20T12:00:00.000Z",
    "updatedAt": "2025-03-20T12:05:00.000Z"
  }
  ```

#### Validation Errors
- **Status Code:** 400 Bad Request  
- **Response Body:**  
  A JSON object with an `errors` array if the `rideId` is missing or invalid.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid ride ID",
        "param": "rideId",
        "location": "body"
      }
    ]
  }
  ```

#### Server Errors
- **Status Code:** 500 Internal Server Error  
- **Response Body:**  
  A JSON object indicating an unexpected error occurred.
  ```json
  {
    "message": "An unexpected error occurred. Please try again later."
  }
  ```

---
## 4. `/rides/start-ride` Endpoint

### Description
This endpoint allows a captain to start a ride. The captain must provide the ride ID and the correct OTP for the ride. Upon validation, the ride status is updated to "ongoing" and the user is notified that the ride has started.

### Endpoint Details
- **Method:** POST  
- **URL:** `/api/v1/rides/start-ride`

### Request Body
The request body must be in JSON format and include:
- **rideId** (string): The unique identifier of the ride to be started.
- **otp** (number): The One Time Password (OTP) provided for ride authentication.

#### Example Request Body
```json
{
  "rideId": "608c1912fc13ae1a44000001",
  "otp": 123456
}
```

### Responses

#### Success
- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object representing the ride which now reflects the status "ongoing".
  ```json
  {
    "_id": "608c1912fc13ae1a44000001",
    "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA",
    "fare": 45.5,
    "status": "ongoing",
    "captain": "60a1f2b3c4d5e6f789012345",
    "createdAt": "2025-03-20T12:00:00.000Z",
    "updatedAt": "2025-03-20T12:10:00.000Z"
  }
  ```

#### Validation Errors
- **Status Code:** 400 Bad Request  
- **Response Body:**  
  A JSON object with an `errors` array if `rideId` or `otp` is missing or invalid.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid ride ID",
        "param": "rideId",
        "location": "body"
      },
      {
        "msg": "Invalid OTP",
        "param": "otp",
        "location": "body"
      }
    ]
  }
  ```

#### Server Errors
- **Status Code:** 500 Internal Server Error  
- **Response Body:**  
  A JSON object indicating an unexpected error during the ride start process.
  ```json
  {
    "message": "An unexpected error occurred. Please try again later."
  }
  ```

---
## 5. `/rides/end-ride` Endpoint

### Description
This endpoint is used by the captain to end a ride. It validates the ride ID provided in the request body and, if valid, updates the ride status to "completed". The user is then notified that the ride has ended.

### Endpoint Details
- **Method:** POST  
- **URL:** `/api/v1/rides/end-ride`

### Request Body
The request body must be in JSON format and include:
- **rideId** (string): The unique identifier of the ride to be ended.

#### Example Request Body
```json
{
  "rideId": "608c1912fc13ae1a44000001"
}
```

### Responses

#### Success
- **Status Code:** 200 OK  
- **Response Body:**  
  A JSON object representing the ride with updated status "completed".
  ```json
  {
    "_id": "608c1912fc13ae1a44000001",
    "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA",
    "fare": 45.5,
    "status": "completed",
    "captain": "60a1f2b3c4d5e6f789012345",
    "createdAt": "2025-03-20T12:00:00.000Z",
    "updatedAt": "2025-03-20T12:30:00.000Z"
  }
  ```

#### Validation Errors
- **Status Code:** 400 Bad Request  
- **Response Body:**  
  A JSON object with an `errors` array if the `rideId` is missing or invalid.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid ride ID",
        "param": "rideId",
        "location": "body"
      }
    ]
  }
  ```

#### Server Errors
- **Status Code:** 500 Internal Server Error  
- **Response Body:**  
  A JSON object indicating an unexpected error occurred during the ride end process.
  ```json
  {
    "message": "An unexpected error occurred. Please try again later."
  }
  ```




  ---
## Socket.IO Real-Time Communication

### Description
This section documents the real-time communication functionality provided by Socket.IO in the project. The server-side implementation is located in the [`socket.js`](./socket.js) file. It handles client connections, room joining, and location updates for both users and captains as well as ride confirmations.

### Socket Initialization
- **File:** `socket.js`
- **Usage:** The Socket.IO server is initialized with the provided HTTP server. CORS is configured to allow all origins with GET and POST methods.

### Events

#### 1. `join`
- **Description:** Associates a client with a user type (either `user` or `captain`) by updating their corresponding database record with the current socket ID.
- **Data Format:**
  ```json
  { 
    "userId": "string", 
    "userType": "user" | "captain" 
  }
  ```
- **Server Action:** Updates the respective user's or captain's document with the current `socket.id`.

#### 2. `update-location-captain`
- **Description:** Allows a captain to update their current location.
- **Data Format:**
  ```json
  { 
    "captainId": "string", 
    "location": { "lat": number, "lng": number },
    "socketId": "string" // target socket id for notifying clients
  }
  ```
- **Server Action:** Updates the captain’s location in the database and notifies clients via the `get-location-captain` event.

#### 3. `confirm-ride`
- **Description:** Enables a captain to confirm a ride request.
- **Data Format:**
  ```json
  { 
    "rideId": "string", 
    "captainId": "string" 
  }
  ```
- **Server Action:** Updates the ride status in the database and emits a `ride-confirmed` event with updated ride information.

#### 4. `update-location-user`
- **Description:** Allows a user to update their location.
- **Data Format:**
  ```json
  { 
    "userId": "string", 
    "location": { "lat": number, "lng": number }, 
    "socketId": "string" // target socket id to notify about user location
  }
  ```
- **Server Action:** Forwards the updated location to the intended recipient by emitting the `get-location-user` event.

#### 5. `disconnect`
- **Description:** Triggered automatically when a client disconnects.
- **Server Action:** Logs the disconnection event on the server.

### Utility Function
- **`sendMessageToSocketId(socketId, messageObject)`**
  - **Description:** Sends a message to a specific socket by its ID.
  - **Usage Example:**
    ```javascript
    // Send a ride update to a specific socket
    sendMessageToSocketId('socketId123', { 
      event: 'rideUpdate', 
      data: { status: 'driver on the way' } 
    });
    ```
  
---