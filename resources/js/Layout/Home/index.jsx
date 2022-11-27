import { Outlet } from "react-router-dom";
import { NavMenu } from "./NavMenu";

export const Home = () => {
    return (
        <div>
            <NavMenu />
            <Outlet />
        </div>
    );
};
