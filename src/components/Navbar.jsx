// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../lib/context/user";

function Navbar() {

  const user = useUser();
  const navigate = useNavigate();

  return (

    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">ProjectManager</div>
        <div className="flex items-center">
          <div className="text-white mr-4">
            Welcome, {user? (JSON.parse(sessionStorage.getItem('user')).providerUid):('')}
          </div>
          <button
            onClick={() => {
              user.logout();
              navigate("/")
              sessionStorage.clear();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
