### Following Are The Request Related To Users

## Request for Register A User

> POST /user/signup

- if User Provides Email, Password then server will Store the data after Bcrypt the password.

- user will get the following response
   - 200 as Response, if user got register successfully.
   - 400 as Response, if user not fills all the fields for registration.
   - 409 as Response, if user already registered.
   - 500 as Response, if server not response.


## Request for Login A User

> POST /user/login

- if User Provides  Email, Password then server will Check the data and Provides a Token.

- User will get the following response
   - 200 as Response, if user got Login successfully.
   - 400 as Response, if user not fills all the fields for Login or user not provide the correct password.
   - 404 as Response, if user not signup before login.
   - 500 as Response, if server not response.


### Following Are The Request Related To Profiles

## Request for creating a Profile

> POST /profile/insert

- if User provides a User_name, User_email, User_password, User_image, Total_orders then serve will store the data.

- User will get the following response
   - 200 as Response, if user post profile successfully.
   - 400 as Response, if user not fills all the fields for creation of profile.
   - 500 as Response, if server not response.


## Request for getting a list of Profiles

> GET /profile

 - User can Access the List of a profiles.

 - User will get the following response
    - 200 as Response, get a list of profiles.
    - 500 as Response, if server not response.


## Request for getting a Details of a Profile By ID

> GET /profile/details/:id

 - User can Access the details of a profile by providing a id of a profile.

 - User will get the following response
    - 200 as Response, get a details of profie.
    - 409 as Response, if profile with that ID not exist.
    - 500 as Response, if server not response.


## Request for getting a Details of image of a Profile By ID

> GET /profile/image/:id

 - User can Access the details of image of a profile by providing a id of a profile.

 - User will get the following response
    - 200 as Response, get a details of image of a profie.
    - 409 as Response, if profile with that ID not exist.
    - 500 as Response, if server not response.


## Request for Updating a Profile By ID.

> PUT /profile/update/:id

- if User provides a ID of a profile in params, then server will get that profile by ID and Update the content of a profile.

- User will get the following response
   - 200 as Response, if product Updated successfully.
   - 400 as Response, if user not fills all the fields for updation of profile.
   - 409 as Response, if product with that ID not exist.
   - 500 as Response, if server not response.


## Request for Deleting a Profile By ID.

> DELETE /profile

- if User provides a ID of a profile in params, then server will get that profile by ID and Delete.

- User will get the following response
   - 200 as Response, if profile Delete successfully.
   - 409 as Response, if profile with that ID not exist.
   - 500 as Response, if server not response.

