<!-- Api End Points i have tested in postman -->

POST-signUp-http://localhost:5000/api/user/register

POST-login-http://localhost:5000/api/user/login

GET-AllUsers-http://localhost:5000/api/user/all_users

GET-Protected-http://localhost:5000/api/user/protected-pass token in headers

<!-- CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dbsg3chsc -->

POST-http://localhost:5000/api/files/upload

POST → http://localhost:5000/api/files/upload
Body → form-data:

file → type: File

folder → type: Text, e.g., myfolder
Response:
{
"\_id": "...",
"name": "myimage",
"url": "https://res.cloudinary.com/your_cloud_name/image/upload/....jpg",
"folder": "myfolder",
"size": 12345,
"type": "jpg",
"createdAt": "...",
"\_\_v": 0
}

GET-http://localhost:5000/api/files/folders

GET-http://localhost:5000/api/files/myFolder

POST-http://localhost:5000/api/user/logout
