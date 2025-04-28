/**
 * @jest-environment node
 */
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../../mongoose/User/user.model";
import { createUser } from "../../../mongoose/User/user.services";
import { UserRole } from "../../../mongoose/User/user.interface";

describe("Integration - createUser service", () => {
    let mongoServer: MongoMemoryServer;
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create()
        const uri = mongoServer.getUri()
        await mongoose.connect(uri);
    });
    afterEach(async () => {
        await User.deleteMany({});
    });
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
    it("should actually insert a ducument and return it", async () => {
        const data = {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "securePassword",
            role: UserRole.DEVELOPER,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const created = await createUser(data);

        expect(created).toMatchObject({
            name: data.name,
            email: data.email,
            role: data.role,
        });
        expect(created._id).toBeDefined();

        const fromDb = await User.findOne({ email: data.email }).lean();
        expect(fromDb).not.toBeNull();
        expect(fromDb).toMatchObject({
            name: data.name,
            email: data.email,
            role: data.role,
        });
    });
});
