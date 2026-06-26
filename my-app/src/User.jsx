import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';
import { useEffect } from 'react';
import axios from 'axios'
function User() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    axios.get('https://basic-crud-backend-one.vercel.app/')
    .then(result=>{setUsers(result.data)})
    .catch(err=>{console.log(err)})
  },[])

  
  const handleDelete = (id) => {
    axios.delete('https://basic-crud-backend-one.vercel.app/delete/'+id)
    .then(result=>{
        console.log(result.data)
        window.location.reload();
    })
    .catch(err=>console.log(err))
  };

  return (
    <div className="crud-container">
      <div className="crud-card">
        
        {/* Top Header Section */}
        <div className="crud-header">
          <h2>User List</h2>
          <button 
            onClick={() => navigate('/create')} 
            className="btn-add"
          >
            + Create User
          </button>
        </div>

        {/* Data Table */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center empty-msg">
                  No records available.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td className="text-center">
                    <div className="action-group">
                      <button
                        onClick={() => navigate(`/update/${user._id}`)} 
                        className="btn-update"
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id)} 
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default User;