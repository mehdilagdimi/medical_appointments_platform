import { useState } from 'react'

const GetTask = ({ onGetApptmnt, userRef }) => {
    // const [userRef, setRef] = useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        if(!userRef){
            alert('Enter an ID');
            return;
        }
        onGetApptmnt(userRef);
        
        // setRef('');
    }
  return (
    <form className="add-form" onSubmit={onSubmit}>
    <div className="form-control">
      <label>Your ID</label>
      <p>{userRef}</p>
      {/* <input type="text" value={userRef} onChange={(e) => setRef(e.target.value)} placeholder="Enter user reference" /> */}
    </div>
    <input className='btn btn-block' type='submit' value ='My Appointments' />
  </form>
  )
}

export default GetTask