import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WeekView from "./components/WeekView";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

// Function to check if user is authenticated
const isAuthenticated = () => {
  return true //TODO: REMOVE THIS
  return localStorage.getItem("user") !== null;
};

// Private Route: Only accessible if user is authenticated
function PrivateRoute({ element }: { element: JSX.Element }) {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
}

// Public Route: Redirects to home if user is already logged in
function PublicRoute({ element }: { element: JSX.Element }) {
  return isAuthenticated() ? <Navigate to="/" replace /> : element;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (Only accessible when NOT logged in) */}
        <Route
          path="/login"
          element={<PublicRoute element={<LoginPage />} />}
        />
        <Route
          path="/signup"
          element={<PublicRoute element={<SignupPage />} />}
        />

        {/* Private routes (Only accessible when logged in) */}
        <Route path="/" element={<PrivateRoute element={<WeekView />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
