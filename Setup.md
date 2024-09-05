URLSIZEREDUCER Controller Test Cases
Test Case 1: Valid Input
1. Input : {
  "originalUrl": "https://example.com",
  "maxClicks": 5,
  "expiresAt": "2024-12-31T23:59:59Z"
}
output:{
  "success": true,
  "message": "The URL has securely stored in the db",
  "data": {
    "originalUrl": "https://example.com",
    "hash": "generated_hash_value",
    "maxClicks": 5,
    "expiresAt": "2024-12-31T23:59:59Z"
  }
}


2. Test Case 2: Missing originalUrl Field
 Input: {
  "maxClicks": 5,
  "expiresAt": "2024-12-31T23:59:59Z"
}
Output: {
  "success": false,
  "message": "OriginalURL is required for further process"
}



3. Test Case 3: Invalid maxClicks Value (Negative)
Input:{
  "originalUrl": "https://example.com",
  "maxClicks": -1,
  "expiresAt": "2024-12-31T23:59:59Z"
}
Output:{
  "success": false,
  "message": "The maxClick count should be a positive integer number"
}


----------------------------------------------------------------------------------------------------------------------------------------


2. URLREDIRECTOR Controller Test Cases
Test Case 1: Valid Hash - Successful Redirection
  Input: Access the URL with hash /abcdef1234.
Expected Output:
  Status Code: 302 Found (or equivalent redirect code).
  Redirects to the originalUrl corresponding to the hash.


Test Case 2: Hash Not Found in Database
  Input: Access the URL with a hash that doesn't exist, e.g., /nonexistenthash.
Output:{
  "message": "No URL found"
}


Test Case 3: URL Expired
Input: Access the URL with an expired hash, e.g., /expiredhash.
Output:{
  "message": "The URL is expired"
}




Test Case 4: Click Limit Exceeded
Input: Access the URL with a hash that has exceeded its maxClicks, e.g., /maxclicksexceeded.
Output:{
  "message": "The URL accessing count limit has exceeded"
}




