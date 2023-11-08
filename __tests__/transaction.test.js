const app = require("../app");
const { supertest } = require("../utils/packages");
const request = supertest(app);

describe("Transaction Endpoints", () => {
  let testBookId; // Store the ID of a book for testing purchase book endpoint

  // Test adding a new book before purchase
  beforeAll(async () => {
    const response = await request.post("/books/add").send({
      title: "Test Book",
      author: "Test Author",
      price: 1000,
      stockQuantity: 10,
    });

    testBookId = response.body.book._id; // Store the ID for future tests
  });

  // Test purchasing a book
  it("should purchase a book", async () => {
    const quantityToPurchase = 3; // Modify the quantity as needed
    const response = await request
      .post(`/transactions/purchase/${testBookId}`)
      .send({ quantity: quantityToPurchase });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("SUCCESSFULLY PURCHASED THE BOOK");
  });

  // Test purchasing more copies than available in stock
  it("should not purchase more copies than available in stock", async () => {
    const quantityToPurchase = 20; // Choose a quantity higher than the available stock
    const response = await request
      .post(`/transactions/purchase/${testBookId}`)
      .send({ quantity: quantityToPurchase });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain("ONLY");
  });

  // Test purchasing with an invalid book ID
  it("should handle an invalid book ID", async () => {
    const response = await request
      .post("/transactions/purchase/invalidBookId")
      .send({ quantity: 2 });

    expect(response.statusCode).toBe(500);
  });

  // Test purchasing with a negative quantity
  it("should handle a negative quantity", async () => {
    const response = await request
      .post(`/transactions/purchase/${testBookId}`)
      .send({ quantity: -2 });

    expect(response.statusCode).toBe(500);
  });
});
