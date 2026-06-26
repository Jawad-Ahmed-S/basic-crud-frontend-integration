import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formStyle.css';
import axios from 'axios'

function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating user:", { name, email, age });
    
    axios.post("http://localhost:8000/create",{name,email,age})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))


    navigate('/');
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Enter Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input 
              type="number" 
              placeholder="Enter Age" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Submit</button>
            <button type="button" onClick={() => navigate('/')} className="btn-cancel">Cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateUser;