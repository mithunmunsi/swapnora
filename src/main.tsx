import "./index.css";
import "../src/styles/style.css";
import App from "./App.tsx";

import ReactDOM from "react-dom/client";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
