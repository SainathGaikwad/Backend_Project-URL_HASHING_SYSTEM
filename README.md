**URL Hashing System with Click Tracking**
**Project Overview**
This project is designed to implement a URL hashing system that preserves the integrity of URLs, enables click tracking, and maintains privacy-aware hashed URLs. The main goal is to reduce long URLs, track the number of clicks, and limit or control access based on specific criteria like expiry dates and click limits, with a catch as mapping the provided url with a unique hashed string to keep it secure and also ensures the data associated with the url to remain as it is.

**Key Features**
URL shortening with privacy-aware hashed URLs: through mapping each given URL with the 
Click tracking functionality for each shortened URL.
URL expiration and click limit validations.
Out-of-the-box setup with no frontend; built entirely using Node.js, Express, and MongoDB.
Project Architecture
1. **Technologies Used**
Node.js & Express: Backend framework for handling server-side logic and routing.
MongoDB: Database used to store URL information, hashes, click counts, and expiration details.
Postman: Used for testing APIs, validation, and functionality checks.
2. **Project Structure**
/controllers: Contains logic for URL handling, including shortening, validation, and redirection.
/routes: Manages routes for the API endpoints, directing requests to the appropriate controller functions.
/models: Defines the data schema for URLs, including fields for the original URL, hash, click count, max clicks, and expiration date.
/utilities: Utility functions like hash generation to create unique short links.
/config: Manages configuration files, including database connections using environment variables.
server.js: Entry point of the application, responsible for starting the server and connecting middleware.

**Sectional Breakdown of the project**
1.** Models**
Purpose: Defines the structure of the URL data stored in the database.
Reasoning: Stores original URLs, shortened hashes, expiration dates, and click counts.
Manages constraints like maxClicks and expiresAt for URL access control.
2. **Controllers**
Purpose: Contains the core business logic for URL shortening, validation, and redirection.
Reasoning: urlSizeReducer: Handles the creation of shortened URLs, validates inputs, and stores data in the database.
urlRedirector: Validates and manages the redirecting process, including checks for expiry and click limits.
3. **Routes**
Purpose: Defines the endpoints of the application (/shorten, /:hash) and directs requests to the appropriate controllers.
Reasoning: Keeps routing logic separate for cleaner code organization.
Ensures scalability and ease of adding new endpoints in the future.
4.** Utilities**
Purpose: Houses helper functions, including the hash generator.
Reasoning: Keeps utility code modular and reusable.
The generateHash function ensures each URL receives a unique identifier.
5.** Configuration**
Purpose: Manages environment settings and database connections.
Reasoning: Uses dotenv for environment variable management to keep sensitive information secure.
Simplifies configuration changes without altering the main codebase.
6. **Error Handling**
Purpose: Manages errors gracefully across different operations.
Reasoning: Provides meaningful error messages to help with debugging and user feedback.
Ensures the application fails gracefully without crashing unexpectedly.
7. **Testing (Postman)**
Purpose: Tests each endpoint's functionality, validates inputs, and simulates various scenarios.
Reasoning: Ensures all functionalities like URL shortening, redirection, and validations are working as expected.
Allows for easy reproduction of test cases and verification of edge conditions.
