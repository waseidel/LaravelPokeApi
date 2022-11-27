import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle =
    "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white";
const nonActiveStyle =
    "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

export const NavigationLink = ({ to, children }) => {
    return (
        <li>
            <NavLink to={to} aria-current="page">
                {({ isActive }) => (
                    <span className={isActive ? activeStyle : nonActiveStyle}>
                        {children}
                    </span>
                )}
            </NavLink>
        </li>
    );
};
