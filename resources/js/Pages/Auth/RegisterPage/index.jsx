import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const http = axios.create({
        baseURL: import.meta.env.REACT_APP_BASE_URL,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
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
            const register = await http.post(`/api/register`, { ...user });
            navigate("/auth/login");
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data);
            }
        }
    };

    if (errors.length > 0) {
        console.log("Hola mundo");
    }

    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            {/**FIX: ERROR messages*/}
            {errors.length > 0 ? (
                <ul>
                    {errors.map((error) => (
                        <li>{error}</li>
                    ))}
                </ul>
            ) : null}
            <form className="space-y-6" onSubmit={handleLogin}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                    Inicia sesión en el Pokedex
                </h5>
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={user.name}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Nombre Apellido"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Correo electronico
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
                        Contraseña
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
                <div>
                    <label
                        htmlFor="password_confirm"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Confirma la contraseña
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmmation"
                        value={user.password_confirmation}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Registrate
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    ¿Ya estás registrado?{" "}
                    <Link
                        to="/auth/login"
                        className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                        Inicia sesión
                    </Link>
                </div>
            </form>
        </div>
    );
};
