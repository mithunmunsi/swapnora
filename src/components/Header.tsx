import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "./Navbar";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <header className="header">
      <Navbar user={user} setUser={setUser} />
    </header>
  );
};

export default Header;
