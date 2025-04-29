import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User } from "../types/User"; // <-- Correct import

interface UserLayoutProps {
  user: User | null;
  setUser: (user: User | null) => void;
  children: React.ReactNode;
}

const UserLayout = ({ user, setUser, children }: UserLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
