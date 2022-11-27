import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon } from "./Pokemon";

export const ListPage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [navigation, setNavigation] = useState({
        previous: "",
        next: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const http = axios.create({
        baseURL: import.meta.env.REACT_APP_BASE_URL,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
    });

    const getPokemons = async (page) => {
        setIsLoading(true);
        let url = "/api/pokemon";
        if (page !== undefined) {
            url = `${url}?${page}`;
        }
        const { data } = await http.get(url);
        setNavigation({
            previous: data.previous,
            next: data.next,
        });
        setPokemons(data.results);
        setIsLoading(false);
    };

    const navigateTo = async (element) => {
        const url = element.replace("https://pokeapi.co/api/v2/pokemon?", "");
        await getPokemons(url);
    };

    useEffect(() => {
        getPokemons();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid h-screen place-items-center">
            <ul className="grid gap-8 grid-cols-5">
                {pokemons.map((pokemon, k) => {
                    return <Pokemon key={k} pokemon={pokemon} id={k} />;
                })}
            </ul>

            <ul className="inline-flex -space-x-px">
                <li>
                    <button
                        className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => navigateTo(navigation.previous)}
                    >
                        Previous
                    </button>
                </li>
                <li>
                    <button
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => navigateTo(navigation.next)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
};
