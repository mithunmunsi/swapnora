export interface User {
  isVerified: import("react/jsx-runtime").JSX.Element;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  votingCredits: number;
  avatar?: string;
  coverPhoto?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;

  token: string | null;

  loading: boolean;

  isAuthenticated: boolean;

  login: (token: string, user: User) => void;

  logout: () => void;

  refreshUser: () => Promise<void>;
}
