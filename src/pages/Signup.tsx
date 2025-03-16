import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    //call the login API
    // get some data which we will store in our local storage
    console.log(payload);
    // navigate to calendar view when the signup is successful
    navigate("/");
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[50vh] flex flex-col gap-4 items-center m-8 p-4 border-[1px]">
        <h1 className="text-bold">Signup</h1>
        <input
          className="w-full border-[1px] p-1"
          type="text"
          placeholder="Name"
          name="name"
          value={payload.name}
          onChange={handleChange}
        />
        <input
          className="w-full border-[1px] p-1"
          type="text"
          placeholder="Email"
          name="email"
          value={payload.email}
          onChange={handleChange}
        />
        <input
          className="w-full border-[1px] p-1"
          type="password"
          placeholder="Password"
          name="password"
          value={payload.password}
          onChange={handleChange}
        />
        <button
          className="w-full bg-blue-500 text-white p-1"
          onClick={handleSubmit}
        >
          Signup
        </button>
        <p>
          Already have an account? Login <Link to="/login" className="text-blue-700 underline">here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
