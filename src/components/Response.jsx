import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
const SYSTEM_PROMPT = `You are a helpful chef. Give a clear, concise recipe based on available ingredients and cooking tools.
Format the answer in clean Markdown for a recipe app:
- Start with a short recipe title.
- Use sections: Ingredients, Why this works, Steps, Tips.
- Do not use Markdown tables.
- Keep ingredients as bullet points.
- Keep steps as a numbered list.
- Avoid long paragraphs.`;

const markdownComponents = {
    h1: ({ children }) => <h1 className="mb-3 text-3xl font-semibold text-gray-950">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-6 mb-2 text-2xl font-semibold text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-5 mb-2 text-xl font-semibold text-gray-900">{children}</h3>,
    p: ({ children }) => <p className="mb-4 leading-8 text-gray-700">{children}</p>,
    ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 marker:text-orange-500">{children}</ul>,
    ol: ({ children }) => <ol className="mb-5 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-orange-500">{children}</ol>,
    li: ({ children }) => <li className="leading-7 text-gray-700">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-gray-950">{children}</strong>,
};

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
            <h2 className='text-2xl font-semibold text-orange-600'>Chef Recommends:</h2>
            <article className="suggested-recipe-container mt-4 rounded-xl border border-orange-100 bg-white p-5 text-left shadow-sm" aria-live="polite">
                {recipe ? <ReactMarkdown components={markdownComponents}>{recipe}</ReactMarkdown> : <p className="text-gray-600">Generating recipe...</p>}
            </article>
        </section>
    );
};

export default Response;
