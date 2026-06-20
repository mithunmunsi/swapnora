export interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
}
export interface User {
  _id: string;

  firstName: string;

  lastName: string;

  email: string;

  avatar?: string;

  votingCredits: number;

  role: "user" | "admin";

  status: "active" | "suspended" | "disabled";

  isVerified: boolean;

  createdAt: string;
}
