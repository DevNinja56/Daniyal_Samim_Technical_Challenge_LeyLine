import React from "react";
import { Link } from "react-router-dom";

const BasicNavbar = () => {
  return (
    <>
      <nav>
        <ul className="flex space-x-4 justify-center p-4 bg-gray-200">
          <li>
            <Link to="/party-a">Party A</Link>
          </li>
          <li>
            <Link to="/party-b">Party B</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BasicNavbar;
