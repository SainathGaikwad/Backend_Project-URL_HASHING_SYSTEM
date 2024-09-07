<!-- Installation : -->

Node.js
MongoDB
Postman

<!-- install the project dependencies : -->

npm install

<!-- Create .env file and add environment variables: -->

PORT=4000
DB_URL= mongodb://127.0.0.1:27017/URLHashingSystem

<!-- steps to run project -->

nodemon server.js OR npm start on terminal

After following this much of the steps the Use postman to get the provided test cases assesed

IN POSTMAN SHOULD BE OF "POST" TYPE AND URL SHOULD BE "http://localhost:4000/URLShortner"

Input and Outputs for postman

1. {
   "originalUrl": "https://www.bing.com/search?q=how+to+get+help+in+windows+11&gs_lcrp=EgZjaHJvbWUqBwgBEEUYwgMyBwgAEEUYwgMyBwgBEEUYwgMyBwgCEEUYwgMyBwgDEEUYwgMyBwgEEEUYwgMyBwgFEEUYwgMyBwgGEEUYwgMyBwgHEEUYwgPSAQoyNTM1NzhqMGoxqAIIsAIB&FORM=ANNTA1&PC=EDGEDSE",
   "maxClicks": 2,
   "expiresAt": "2024-12-31T23:59:59Z"
   }
   {
   "success": true,
   "message": "URL stored in Database",
   "data": {
   "originalUrl": "https://www.bing.com/search?q=how+to+get+help+in+windows+11&gs_lcrp=EgZjaHJvbWUqBwgBEEUYwgMyBwgAEEUYwgMyBwgBEEUYwgMyBwgCEEUYwgMyBwgDEEUYwgMyBwgEEEUYwgMyBwgFEEUYwgMyBwgGEEUYwgMyBwgHEEUYwgPSAQoyNTM1NzhqMGoxqAIIsAIB&FORM=ANNTA1&PC=EDGEDSE",
   "hash": "generated_hash_value",
   "maxClicks": 78,
   "expiresAt": "2024-12-31T23:59:59Z"
   }
   }

2. original Url add
   {
   "maxClicks": 7,
   "expiresAt": "2025-9-31T23:59:59Z"
   }

   {
   "success": false,
   "message": "Please add an original URL"
   }

3. Max count should be positive number
   {
   "originalUrl": "https://www.bing.com/search?q=how+to+get+help+in+windows+11&gs_lcrp=EgZjaHJvbWUqBwgBEEUYwgMyBwgAEEUYwgMyBwgBEEUYwgMyBwgCEEUYwgMyBwgDEEUYwgMyBwgEEEUYwgMyBwgFEEUYwgMyBwgGEEUYwgMyBwgHEEUYwgPSAQoyNTM1NzhqMGoxqAIIsAIB&FORM=ANNTA1&PC=EDGEDSE",
   "maxClicks": -5,
   "expiresAt": "2025-12-31T23:59:59Z"
   }

{
"success": false,
"message": "Maximum count should be positive number"
}

THE URL TO BE USED IN POSTMAN SHOULD BE OF "GET" TYPE AND URL SHOULD BE "http://localhost:4000/:hash" :hash = provide the value of url hash present in the DB

2. URLREDIRECTOR Controller Test Cases
   Correct Hash - Successful Redirect
   Access the URL with hash /gtjhehg.
   answer :
   Status Code: 302 Found (or equivalent redirect code).
   Redirects to the originalUrl corresponding to the hash.

Hash Not Found in Database
Access the URL with a hash that doesn't exist
{
"message": "No URL found"
}

URL Expired
Access the URL with an expired hash
{
"message": " URL Expired"
}

URL COUNT Limit Exceeded
Access the URL with a hash that has exceeded its maxClicks, e.g., /maxclicksexceeded.
{
"message": "URL COUNT LIMIT EXCEEDED"
}
