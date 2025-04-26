process.env.MONGO_URI = "mongodb+srv://pascal:Pm148e6@cluster0.k11a4.mongodb.net/gojira?retryWrites=true&w=majority";
/**
 * @jest-environment node
 */
import dbConnect from "../../middleware/db-connect";
import mongoose from "mongoose";

describe("dbConnect (MongoDB Atlas)", () => {
  afterEach(async () => {
    jest.clearAllMocks();
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  test("connects to MongoDB Atlas", async () => {
    await dbConnect();
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });

  test("disconnects from MongoDB Atlas", async () => {
    await dbConnect();
    await mongoose.disconnect();
    expect(mongoose.connection.readyState).toBe(0); // 0 = disconnected
  });
});
