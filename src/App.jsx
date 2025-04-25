import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";

const App = () => {

  const [items, setItems] = useState([])//available ingredients list

  const [haveItems, setHaveItems] = useState(false) //conditional rendering of the footer

  return (
    <div className=" flex justify-center">
      <div className="border-black border-2 shadow-2xl p-2 m-3 flex flex-col gap-4 rounded-2xl w-full max-w-3xl min-w-sm bg-gray-100 ">
        <Header/>

        <Form
        items={items}
        setItems={setItems}
        haveItems={haveItems}
        setHaveItems={setHaveItems}
        />
      </div>
    </div>
  )
}

export default App
