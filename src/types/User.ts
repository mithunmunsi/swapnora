export interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
}
export interface User {
  name: string;
  profilePic: string;
  profile?: UserProfile;
  email?: string;
  role?: string;
}
