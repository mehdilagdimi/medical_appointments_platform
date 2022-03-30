import Authenticate from "./components/Authenticate";
import "./App.css";

function App() {
  const addUser = async (user) => {
    console.log(user)
    const res = await fetch( `http://localhost/Medical%20appointments%20platform/api/Users/signup`, {
      method: "POST",
      headers: {
        'Content-Type' : "application/json",
      },
      body: JSON.stringify(user),
    } 
    ).then((response) => response.json());
    console.log(res)
    return;
  };

  return (
      <div className="container">
        <Authenticate onAdd={addUser} />
      </div>
  );
}

export default App;
