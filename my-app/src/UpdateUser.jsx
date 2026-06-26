import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import './formStyle.css';
import axios from 'axios'
 


function UpdateUser() {
  const navigate = useNavigate();

  const {id} = useParams()
  const [name, setName] = useState(); 
  const [email, setEmail] = useState();
  const [age, setAge] = useState();


  useEffect(()=>{
      axios.get('http://localhost:8000/update/'+id)
      .then(result=>{
    
        setName(result.data.name)
        setEmail(result.data.email)
        setAge(result.data.age)
      })
      .catch(err=>{console.log(err)})
    },[])

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updating user record:", { name, email, age });
    
    axios.put('http://localhost:8000/update/'+id,{name,email,age})
    .then(result=>{console.log(result.data)})
    .catch(err=>{console.log(err)})
    navigate('/'); 
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Update User Details</h2>
        <form onSubmit={handleUpdate}>
          
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" style={{ backgroundColor: '#ea580c' }}>
              Update Record
            </button>
            <button type="button" onClick={() => navigate('/')} className="btn-cancel">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UpdateUser;