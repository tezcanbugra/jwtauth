# jwtauth
Jwt based authentication with NodeJS and MongoDB

To use authentication you need to create a file named ".env" in root folder and add MongoDB connection string after "DB_CONNECT = " and you should add an secret token for salting the password in same file after "TOKEN_SECRET" keyword. You can specify any string you want.

After creating .env file, you can start server locally with "nodemon start" (you need nodemon package) or "node start" commands.