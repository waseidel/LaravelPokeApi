import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate();
    const http = axios.create({
        baseURL: import.meta.env.REACT_APP_BASE_URL,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    const checkLogged = async () => {
        try {
            const loggedUser = await http.get("/api/user");
            if (loggedUser.status === 401) navigate("/list");
        } catch (e) {}
    };

    useEffect(() => {
        checkLogged();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Outlet http={http} />
        </div>
    );
};
