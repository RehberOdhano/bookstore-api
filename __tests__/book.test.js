const app = require("../app");
const { supertest } = require("../utils/packages");
const request = supertest(app);

describe("Book Endpoints", () => {
  // Store the ID of a book for testing getSpecificBook and deleteBook endpoints
  let testBookId;

  // Test adding a new book
  it("should add a new book", async () => {
    const response = await request.post("/api/books/add").send({
      title: "Test Book 2",
      author: "Test Author",
      price: 1000,
      stockQuantity: 500,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.book.title).toBe("Test Book");
    testBookId = response.body.book._id;
  });

  // Test retrieving all books
  it("should retrieve all books", async () => {
    const response = await request.get("/api/books/all");
    expect(response.statusCode).toBe(200);
    expect(response.body.books.length).toBeGreaterThan(0);
  });

  // Test retrieving a specific book
  it("should retrieve a specific book", async () => {
    const response = await request.get(`/api/books/${testBookId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.book._id).toBe(testBookId);
  });

  // Test deleting a book
  it("should delete a book", async () => {
    const response = await request.delete(`/api/books/delete/${testBookId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("SUCCESSFULLY DELETED THE BOOK");
  });
});
