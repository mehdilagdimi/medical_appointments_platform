import Authenticate from './components/Authenticate'
import './App.css';

function App() {

  const addUser = async(user) => {
    // const res = await fetch();
    return;
  }

  return (
    <div className="container">
      <Authenticate onAdd={addUser}/>
    </div>
  );
}

export default App;
