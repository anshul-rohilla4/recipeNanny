import React from 'react'


const ItemsInput = ({inputValue, setInputValue, handleAddItem}) => {
    
    return (
        <div className="input flex flex-row justify-center items-center gap-3">
            <input placeholder="e.g. oregeno" 
                type="text" 
                className="p-3 font-normal flex-grow bg-gray-200 rounded-xl"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddItem(e);
                    }
                }}
                aria-label="add ingredients"

            />
            <button className="text-xl font-normal whitespace-nowrap text-white bg-black rounded-xl p-2 active:scale-95  transition-transform duration-300 ease-in-out"
                type="button"
                onClick={handleAddItem}
            >+Add ingredients</button>
        </div>)
}

export default ItemsInput