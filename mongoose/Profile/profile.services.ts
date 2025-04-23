import Profile from "./profile.model";
import { ProfileInterface } from "./profile.interface";

export const createProfile = async (data: ProfileInterface) => {
    try {
        const profile = await Profile.create(data);
        return profile;
    } catch (error) {
        throw new Error(`Error creating user: ${error}`);
    }
}