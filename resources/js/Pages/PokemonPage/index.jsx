import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Abilities } from "./Abilities";
import { Type } from "./Type";

export const PokemonPage = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const http = axios.create({
        baseURL: "http://localhost",
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
    });

    const getPokemon = async () => {
        const response = await http.get(`/api/pokemon/${id}`);
        setPokemon(response.data);
        setIsLoading(false);
        console.log(pokemon);
    };

    useEffect(() => {
        getPokemon();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    return (
        <div className="grid h-screen place-items-center">
            <div className="max-w-sm overflow-hidden shadow-lg">
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-5 h-5"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                    </svg>
                </button>
                <img
                    className="w-full"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                />
                <div className="px-6 py-4 border-t-2">
                    <div className="capitalize font-bold text-xl mb-2">
                        {pokemon.name} #{pokemon.id}
                    </div>
                    <p className="text-grey-darker text-base">
                        <b className="capitalize">{pokemon.name}</b> is a
                        pokemon that weights <b>{pokemon.weight}</b> pounds. Its
                        base experience is <b>{pokemon.base_experience}</b>{" "}
                        points.
                    </p>
                </div>
                <h2 className="px-4 text-xl font-semibold">Abilities</h2>
                <div className="px-4 py-4 flex">
                    {pokemon.abilities.map((ability) => (
                        <Abilities key={ability.slot} ability={ability} />
                    ))}
                </div>
                <h2 className="px-4 text-xl font-semibold">Type</h2>
                <div className="px-4 py-4 flex">
                    {pokemon.types.map((type) => (
                        <Type key={type.slot} type={type} />
                    ))}
                </div>
            </div>
        </div>
    );
};
