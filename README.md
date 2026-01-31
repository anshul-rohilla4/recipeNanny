# RecipeNan

A modern recipe recommendation application powered by AI. Input your available ingredients and get personalized recipe suggestions using Hugging Face's inference API.

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 6.3
- **Styling:** Tailwind CSS 4.1
- **UI Components:** React Markdown
- **HTTP Client:** Axios
- **AI Integration:** Hugging Face Inference API
- **Code Quality:** ESLint 9

## Workflow

1. **User Input:** Users enter available ingredients through an input form
2. **Ingredient Management:** Ingredients are stored in component state
3. **Recipe Generation:** Form submission triggers AI request via Hugging Face API
4. **Response Rendering:** AI-generated recipes are displayed with markdown support
5. **Conditional UI:** Footer and response sections render based on ingredient availability

## Project Structure

```
src/
├── App.jsx                    # Main application component
├── main.jsx                   # React entry point
├── index.css                  # Global styles
└── components/
    ├── Header.jsx             # Application header
    ├── Form.jsx               # Ingredient input form
    ├── ItemsInput.jsx         # Individual ingredient input field
    ├── IngridentsList.jsx      # Display list of added ingredients
    ├── CookOptions.jsx         # Cooking preference options
    ├── Response.jsx            # Recipe response display
    └── SubmitFooter.jsx        # Form submission controls
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts Vite dev server on `http://localhost:5173`



**Live Demo:** https://genie-rasoi.netlify.app/