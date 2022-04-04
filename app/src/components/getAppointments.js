import { useState } from 'react'
import { Link } from 'react-router-dom'
 
const GetTask = ({ userRef }) => {
    // const [userRef, setRef] = useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        if(!userRef){
            alert('Enter an ID');
            return;
        }
        // onGetApptmnt(true);
        // userRef(userRef);
        
        // setRef('');
    }
  return (
    <form className="add-form" onSubmit={onSubmit}>
    <div className="form-control">
      <label>Your ID</label>
      <p>{userRef}</p>
      {/* <input type="text" value={userRef} onChange={(e) => setRef(e.target.value)} placeholder="Enter user reference" /> */}
    </div>
    <Link to="/appointments">
      <input className='btn btn-block' type='submit' value ='My Appointments' />
    </Link>

  </form>
  )
}

export default GetTask