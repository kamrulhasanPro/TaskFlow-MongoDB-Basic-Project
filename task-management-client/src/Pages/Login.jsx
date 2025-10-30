import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    loginUser(email, password)
    .then(() => {
        // console.log(res.user)
        toast.success('successfully login')
        e.target.reset()
        navigate('/')
    })
    .catch(err => {
        toast.error(err.code)
    })
  };
  return (
    <div className="bg-emerald-500 rounded-xl p-7 text-black w-4-/12 sm:w-7/12  mx-auto ">
      <p className="text-3xl text-center text-white mb-8">Login the user</p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 ">
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="my-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="my-input"
        />
        <button className="btn mt-4 text-xl">Login</button>
      </form>

      <p className="text-center mt-4 text-white">
        don't already have an account.{" "}
        <Link to={"/register"} className="text-black underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
