// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [user, setUser] = useState<{ name: string; profilePic: string } | null>(
    null
  );

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Only show Navbar if user is NOT logged in */}
        {/* Only render Navbar if user is null */}
        {!user && <Navbar user={user} setUser={setUser} />}
        {/* Alway show Navbar */}
        {/*         <Navbar user={user} setUser={setUser} />
         */}{" "}
        <main className="flex-grow">
          <AppRoutes user={user} setUser={setUser} />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
