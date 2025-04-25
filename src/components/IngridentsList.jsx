const IngredientsList = (props) => {
    return (
        <div className=" p-3 flex flex-col gap-4">
            <span className=" font-medium">Ingredients on hand:</span>
            <ul className="list-disc list-inside text-xl marker:text-amber-500 font-normal">
                {props.items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default IngredientsList;