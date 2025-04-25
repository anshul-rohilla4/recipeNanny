import React from 'react'
import { useState } from 'react';
const CookOptions = () => {

    const [showDietInput, setShowDietInput] = useState(false);

    return (
        <div className="options flex flex-col text-xl gap-1">
            <label htmlFor="stove">
                <input type="checkbox" name="stove" id="stove"
                    className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-300 checked:border-transparent focus:outline-none transition-all" />
                {" "}I have a stove or gas burner
            </label>
            <label htmlFor="boil">
                <input type="checkbox" name="boil" id="boil"
                    className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-300 checked:border-transparent focus:outline-none transition-all" />
                {" "}I can boil water
            </label>
            <label htmlFor="microwave">
                <input type="checkbox" name="microwave" id="microwave"
                    className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-300 checked:border-transparent focus:outline-none transition-all" />
                {" "}I have a microwave
            </label>
            <label htmlFor="diet">
                <input type="checkbox" name="diet" id="diet"
                    className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-300 checked:border-transparent focus:outline-none transition-all"
                    onChange={(e) => setShowDietInput(e.target.checked)} />
                {" "}I have dietary restrictions/preferences
            </label>
            <div
                className={`transition-all duration-300 transform ${showDietInput ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0 overflow-hidden'
                    }`}
            >
                <input
                    type="text"
                    name="dietText"
                    placeholder="e.g. vegetarian, gluten-free"
                    aria-label="dietary restrictions/preferences"
                    className="p-3 m-1 w-full bg-gray-100 rounded-2xl text-black text-lg shadow-md shadow-amber-200 focus:outline-none focus:ring-1 focus:ring-amber-300"
                />
            </div>
        </div>
    )
}

export default CookOptions