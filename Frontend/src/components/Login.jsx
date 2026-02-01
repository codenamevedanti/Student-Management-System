import React, { useState } from 'react';
import * as api from '../services/api'; 

function Login({ onLogin }) { // prop name
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await api.login({ 
        Username: form.username, 
        Password: form.password 
      });
      
      
      if (response.data.success) {
        onLogin(true); 
      }
    } catch (err) {
      console.error("Login Error:", err.response);
  
      
      if (err.response && err.response.status === 401) {
          alert("Invalid username or password.");
      } else {
          alert("The server is not responding. Please check if the backend is running.");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={form.username}
          onChange={e => setForm({...form, username: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;