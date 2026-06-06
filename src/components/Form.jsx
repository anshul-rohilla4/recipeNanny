import React from 'react'
import { useState } from 'react';

import Response from './Response';
import IngredientsList from './IngridentsList';
import CookOptions from './CookOptions';
import ItemsInput from './ItemsInput';
import SubmitFooter from './SubmitFooter';

const Form = ({ items, setItems, haveItems, setHaveItems }) => {

    const [inputValue, setInputValue] = useState("");
    const [showResponse, setShowResponse] = useState(false); 

    const handleAddItem = (e) =>//adding ingredients
    {
        e.preventDefault();
        if (inputValue.trim()) {
            setItems([...items, inputValue]);
            setInputValue("");
            setHaveItems(true);
        }
    }

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleGenerateResponse = () =>//get recipe button
    {
        const form = new FormData(document.forms['ingredients']);
        // const data = Object.fromEntries(form.entries());

        const options = [];
        if (form.get("stove")) options.push("stove");
        if (form.get("boil")) options.push("boil");
        if (form.get("microwave")) options.push("microwave");
        if (form.get("diet")) {
            options.push("diet");
            options.push(`dietText: ${form.get("dietText")}`);
        }
        setSelectedOptions(options);

        console.log('ingrideints :', items);
        console.log("selected options :", options);
        //console.log(data); // You can send this to an API later

    }

    return (
        <div className="main flex flex-col gap-5 rounded-2xl bg-gray-100">
            <form className="form flex flex-col  gap-2"
                name="ingredients"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleGenerateResponse();
                    setShowResponse(true);
                }}
            >
                <ItemsInput 
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleAddItem={handleAddItem} />
                
                <div className="main-after">
                    {haveItems ? //if items are added then the following part is rendered (conditional rendering)
                        (<>
                            <IngredientsList items={items}/>
                            <CookOptions/>

                            <SubmitFooter items={items}/>
                        </>
                        ) : null}
                </div>

                <Response 
                showResponse={showResponse} 
                items={items}
                selectedOptions={selectedOptions}

                />
            </form>
        </div>
    )
}

export default Form
