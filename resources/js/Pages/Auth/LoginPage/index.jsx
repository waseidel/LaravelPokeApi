import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const http = axios.create({
        baseURL: import.meta.env.REACT_APP_BASE_URL,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
    });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleClick = () => {
        setUser({
            ...user,
            remember: !user.remember,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const csrf = await http.get("/sanctum/csrf-cookie");
        try {
            const login = await http.post(`/api/login`, { ...user });
            navigate("/list");
        } catch (error) {}
    };

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleLogin}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                    Login in Pokedex
                </h5>
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@gmail.com"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>
                <div className="flex items-start">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                value={user.remember}
                                onClick={handleClick}
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                            />
                        </div>
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Remember me
                        </label>
                    </div>
                    <Link
                        to="/auth/forgot"
                        className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Forgot your password?
                    </Link>
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Login
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?{" "}
                    <Link
                        to="/auth/register"
                        className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                        create an account
                    </Link>
                </div>
            </form>
        </div>
    );
};
