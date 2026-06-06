import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
const SYSTEM_PROMPT = "You are a helpful chef. Give a clear and concise recipe based on available ingredients and cooking tools.";

const Response = ({ showResponse, items, selectedOptions }) => {
    const [recipe, setRecipe] = useState("");

    useEffect(() => {
        if (!showResponse) return;
        setRecipe("");

        // const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN); //hugging face

        async function getRecipeFromOpenRouter() {
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
            const ingredientsString = items.join(", ");
            const optionsString = selectedOptions.join(", ");

            if (!apiKey) {
                setRecipe("Missing OpenRouter API key. Add VITE_OPENROUTER_API_KEY to your .env file.");
                return;
            }

            // console.log("API Key being used:", import.meta.env.VITE_OPENROUTER_API_KEY);

            // try {
            //     const response = await hf.chatCompletion({
            //         model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            //         messages: [
            //             { role: "system", content: SYSTEM_PROMPT },
            //             { role: "user", content: `I have ${ingredientsString} ingredients and I also have the following tools/options available: ${optionsString}. Please give me a recipe you'd recommend!` },
            //         ],
            //         max_tokens: 1024,
            //     });

            //     setRecipe(response.choices[0].message.content);
            // } catch (err) {
            //     console.error("Hugging Face error:", err.message);
            //     setRecipe("Sorry, something went wrong while generating the recipe.");
            // }

            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "HTTP-Referer": window.location.origin, // Optional. Site URL for rankings on openrouter.ai.
                        "X-Title": "Chef Nan", // Optional. Site title for rankings on openrouter.ai.
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "model": "openai/gpt-oss-20b:free",
                        "messages": [
                            {
                                "role": "system",
                                "content": SYSTEM_PROMPT 
                            },
                            {
                                "role": "user",
                                "content": `I have ${ingredientsString} ingredients and I also have the following tools/options available: ${optionsString}. Please give me a recipe you'd recommend!`
                            }
                        ]
                    })
                });
                if(!response.ok){
                    throw new Error(`OpenRouter API error :${response.statusText}`);
                }
                const data = await response.json();
                const content = data?.choices?.[0]?.message?.content;
                setRecipe(content || "Sorry, I could not generate a recipe from that response.");
            }
            catch(err){
                console.error("OpenRouter error: ",err.message);
                setRecipe("Sorry, something went wrong while generating the recipe.")
            }
        }
    

        getRecipeFromOpenRouter();
    }, [showResponse, items, selectedOptions]);

    if (!showResponse) return null;

    return (
        <section className="mt-5 m-3 text-lg text-gray-800 transition-opacity duration-500 ease-in-out animate-fadeIn">
            <h2 className='text-2xl'>Chef Recommends:</h2>
            <article className="suggested-recipe-container text-justify pt-3" aria-live="polite">
                {recipe ? <ReactMarkdown>{recipe}</ReactMarkdown> : <p>Generating recipe...</p>}
            </article>
        </section>
    );
};

export default Response;
