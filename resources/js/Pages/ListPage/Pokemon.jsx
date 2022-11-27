import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Pokemon = ({ pokemon }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokeCard, setPokeCard] = useState({});
    const getPokemon = async () => {
        const { data } = await axios.get(`/api/pokemon/${pokemon.name}`);
        setIsLoading(true);
        setPokeCard(data);
        setIsLoading(false);
    };
    useEffect(() => {
        getPokemon();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    return (
        <li>
            <Link
                to={`/pokemon/${pokeCard.name}`}
                className="border shadow-md w-64 p-4 border-gray-100 my-2 hover:shadow-md capitalize flex items-center text-lg bg-gray-200 rounded-md"
            >
                <img
                    src={pokeCard.sprites.front_default}
                    className="w-20 h-20 mr-3"
                />
                <span className="font-bold mr-3">{pokeCard.id}</span>
                {pokeCard.name}
            </Link>
        </li>
    );
};
