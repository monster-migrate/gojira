import { getAllUser } from "../../../../mongoose/User/user.services";
import User from "../../../../mongoose/User/user.model";
import { mockUserData } from "../../../../helpers/__mocks__/mockUserData";
import { UserInterface } from "../../../../mongoose/User/user.interface";

jest.mock("../../../../mongoose/User/user.model");
describe("getAllUser service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const mockUsersData:UserInterface[] = [];
    mockUsersData.push(mockUserData)
    it("should return all users", async () => {
        (User.find as jest.Mock).mockResolvedValue(mockUsersData)
        const result = await getAllUser()
        expect(User.find).toHaveBeenCalledWith({})
        expect(result).toEqual(mockUsersData)
    });
    it("should return empty array when no users exist", async () => {
        // Arrange
        (User.find as jest.Mock).mockResolvedValue([]);
    
        // Act
        const result = await getAllUser();
    
        // Assert
        expect(result).toEqual([]);
      });
      it("should throw error when database fails", async () => {
        // Arrange
        const dbError = new Error("Database connection failed");
        (User.find as jest.Mock).mockRejectedValue(dbError);
    
        // Act & Assert
        await expect(getAllUser())
          .rejects
          .toThrow("Error getting all users: Error: Database connection failed");
      });
});