export interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  profile?: UserProfile;
  role?: string;
}
