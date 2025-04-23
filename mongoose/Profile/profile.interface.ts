export enum UserRole {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    DEVELOPER = 'DEVELOPER',
    USER = 'USER',
    VIEWER = 'VIEWER',
}
export interface ProfileInterface {
    userId: string;
    name: string;
    email: string;
    role: string;
    organization: string;
    department: string;
    location: string;
    mobile: string;
    countryCode: string;
    teams: string[];
    createdAt: Date;
    updatedAt: Date;
}