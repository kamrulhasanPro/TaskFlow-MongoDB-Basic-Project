import React from "react";
import MyLink from "./MyLink";
import { useAuth } from "../Hooks/useAuth";
import { Link } from "react-router";
import { toast } from "react-toastify";

const Navbar = () => {
    const {user, logoutUser} = useAuth()
    // console.log(user);
    const navList = <>
    <MyLink to={'/'}>Home</MyLink>
    {
        user ? <MyLink to={'/task-flow'}>TaskFlow</MyLink>
       :<>
       <MyLink to={'/login'}>Login</MyLink>
       <MyLink to={'/register'}>Register</MyLink>
       </>
    }
    </>

    const handelLogout = () => {
        logoutUser()
        .then(() => toast.success('Logout success'))
        .catch(err => {
            toast.error(err.code)
        })
    }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
                {
                    navList
                }
            </ul>
          </div>
          <Link to={'/'} className="btn btn-ghost text-xl">TaskFlow</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navList}
          </ul>
        </div>
        <div className="navbar-end">
          {
            user 
            ? <Link onClick={handelLogout} className="btn btn-secondary text-xl">Logout</Link>
            : <Link to={'/login'} className="btn btn-success text-xl">Login</Link>
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;
