import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear field error when user types
  }

  function validateForm() {
    let newErrors: { [key: string]: string } = {};
    if (!payload.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(payload.email))
      newErrors.email = "Invalid email format";

    if (!payload.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    setLoading(true);
    setApiError("");

    try {
      const response = await fetch("https://api.example.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
    } catch (error: any) {
      setApiError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[50vh] flex flex-col gap-4 items-center m-8 p-4 border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Login</h1>

        {apiError && <p className="text-red-500">{apiError}</p>}

        <div className="flex flex-col gap-2 w-full">
          <input
            className=" border border-gray-300 p-2 rounded-md"
            type="text"
            placeholder="Email"
            name="email"
            value={payload.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <input
            className="w-full border border-gray-300 p-2 rounded-md"
            type="password"
            placeholder="Password"
            name="password"
            value={payload.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? Signup{" "}
          <Link to="/signup" className="text-blue-700 underline">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
