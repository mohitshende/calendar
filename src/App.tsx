import WeekView from "./components/WeekView";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<WeekView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
