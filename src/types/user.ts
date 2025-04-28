// src/types/user.ts

export interface User {
  _id: string; // Assuming MongoDB ObjectId
  name: string;
  email: string;
  username: string;
  password: string;
  photo: string;
  role: "user" | "admin"; // Enum for role
  createdAt: Date;
  updatedAt: Date;
}
