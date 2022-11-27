export const Abilities = (props) => {
    const { ability } = props.ability;
    return (
        <div>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {ability.name}
            </span>
        </div>
    );
};
