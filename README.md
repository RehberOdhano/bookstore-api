# READ ME

## About the project

Its basically a simple RESTful API built using the Express Framework, having the following endpoints:
* `GET /books` Retrieve all books.
* `GET /books/:id` Retrieve a specific book by its ID.
* `POST /books` Add a new book.
* `PUT /books/:id` Update a book.
* `DELETE /books/:id` Remove a book.
* `POST /transactions` Purchase a book. This should decrease the stockQuantity of the purchased book and create a new record in the transactions table.

Following are the possible future improvements that we can made to this project:

* Implementing user authentication and authorization.
* Adding pagination to handle large datasets.
* Improving error handling and validation for input data.
* Enhancing logging and monitoring for better debugging.
* Implementing database migrations for easier schema updates.
* Optimizing database queries for better performance.

## Project Setup Instructions:

* Fork or clone the repository
* Run `npm i` command to install node modules first
* Then create `.env` file and add environment variables such as PORT, etc
* Run `npm run server` to start the server

