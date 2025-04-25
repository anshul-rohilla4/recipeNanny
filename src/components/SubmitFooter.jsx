import React from 'react'

const SubmitFooter = ({ items }) => {
    return (
        <div>
            {items.length >= 3 &&
                <div className="footer bg-gray-300 p-5 justify-between flex flex-row rounded-xl gap-2 m-2 mt-3">
                    <div className="flex flex-col">
                        <span>Ready for recipe?</span>
                        <span>Generate a recipe from your list of ingredients.</span>
                    </div>
                    <button className="bg-orange-400 p-3 rounded-xl active:scale-95 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-amber-300 hover:-translate-y-1"
                        type="submit"
                        aria-label="get-recipe"
                    >
                        Get a recipe
                    </button>
                </div>
            }
        </div>
    )
}

export default SubmitFooter