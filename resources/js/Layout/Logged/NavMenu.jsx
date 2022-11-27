import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavigationLink } from "../../components";

export const NavMenu = ({ http }) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await http.post("/api/logout");
            navigate("/");
        } catch (error) {}
    };
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="flex justify-between  container  flex-wrap items-center  mx-auto">
                <div className="flex">
                    <Link
                        href="https://flowbite.com/"
                        className="flex items-center"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
                            className="h-6 mr-3 sm:h-9"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            PokeDex
                        </span>
                    </Link>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="navbar-default"
                    >
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <NavigationLink to="/">Home</NavigationLink>
                            <NavigationLink to="/list">PokeList</NavigationLink>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col align-middle p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <ul className="flex flox-col space-x-3">
                        <NavigationLink to="/profile">Profile</NavigationLink>
                        <button
                            onClick={handleLogout}
                            className="border px-2 py-1 bg-blue-50"
                        >
                            Cerrar sesión
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
