import Authenticate from "./components/Authenticate";
import "./App.css";

function App() {

  const addUser = async (user) => {
    // console.log(typeof(user))
    // console.log(JSON.stringify(user))
    // console.log(user)
    var resClone;
    // user = JSON.stringify(user)
    // user = {"fName":"Asperiores irure lab","lName":"Qui sint eu veniam ","birthDate":"2016-04-02"}
    const res = await fetch(`http://localhost/Medical%20appointments%20platform/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(user),
    } 
    ).then(async (response) => {
      try {
        resClone = response.clone();

        const data = await response.json()
        console.log('response data?', data)
      } 
      catch(error) {
        console.log('Error happened here!')
        console.error("error : ", error, resClone);
        resClone.text().then((text)=> 
          {console.log("received this :", text)}
        )
      }
    })
    // .then((response) => {response.json())
    // .then((data)=> console.log(data))
    
    console.log(res)
    // return;
  };

  return (
      <div className="container">
        <Authenticate onAdd={addUser} />
      </div>
  );
}

export default App;
