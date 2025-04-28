import { getUserByEmail } from "../../../../mongoose/User/user.services";
import User from "../../../../mongoose/User/user.model";
import { mockUserData } from "../../../../helpers/__mocks__/mockUserData";
jest.mock("../../../../mongoose/User/user.model");
describe("getUserByEmail service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("should get user by email", async () => {
        // Arrange
        (User.findOne as jest.Mock).mockResolvedValue(mockUserData);
        const email = "johndoe@example.com";

        // Act
        const result = await getUserByEmail(email);

        // Assert
        expect(User.findOne).toHaveBeenCalledWith({ email });
        expect(result).toEqual(mockUserData);
    });

    it("should return null when user not found", async () => {
        // Arrange
        (User.findOne as jest.Mock).mockResolvedValue(null);
        const email = "notfound@example.com";

        // Act
        const result = await getUserByEmail(email);

        // Assert
        expect(result).toBeNull();
    });

    it("should throw error with proper message on database failure", async () => {
        // Arrange
        const dbError = new Error("Error: Connection timeout");
        (User.findOne as jest.Mock).mockRejectedValue(dbError);
        const email = "error@example.com";

        // Act & Assert
        await expect(getUserByEmail(email))
            .rejects
            .toThrow("Error fetching user: Error: Connection timeout");
    });
});