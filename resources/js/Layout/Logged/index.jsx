import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavMenu } from "./NavMenu";

export const Logged = () => {
    const navigate = useNavigate();
    const http = axios.create({
        baseURL: import.meta.env.REACT_APP_BASE_URL,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
    });

    const checkLogged = async () => {
        try {
            await http.get("/api/user");
        } catch (e) {
            if (e.response.status === 401) {
                navigate("/auth/login");
            }
        }
    };

    useEffect(() => {
        checkLogged();
    }, []);

    return (
        <div>
            <NavMenu http={http} />
            <div className="grid place-items-center h-screen bg-gray-100">
                <div className="w-full">
                    <Outlet http={http} />
                </div>
            </div>
        </div>
    );
};
