import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, Auth, Logged } from "./Layout";
import {
    HomePage,
    LoginPage,
    ListPage,
    RegisterPage,
    PokemonPage,
    Error404,
    ProfilePage,
} from "./Pages";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="" index element={<HomePage />} />
                </Route>
                <Route path="/list" element={<Logged />}>
                    <Route path="" index element={<ListPage />} />
                </Route>
                <Route path="/profile" element={<Logged />}>
                    <Route path="" index element={<ProfilePage />} />
                </Route>
                <Route path="/pokemon" element={<Logged />}>
                    <Route path=":id" element={<PokemonPage />} />
                </Route>
                <Route path="/auth" element={<Auth />}>
                    <Route path="login" index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
