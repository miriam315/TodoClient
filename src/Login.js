import React, { useState } from 'react';
import service from './service';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [name, setName] = useState("");
  const [pas, setPas] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await service.login(name, pas);
      navigate('/'); // מעבר לדף הראשי לאחר התחברות
    } catch (error) {
      alert("שם משתמש או סיסמה שגויים");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>התחברות</h2>
        <input placeholder="שם משתמש" onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder="סיסמה" onChange={(e) => setPas(e.target.value)} />
        <button type="submit">התחבר</button>
        <button type="button" onClick={() => navigate('/register')}>אין לך משתמש? הירשם כאן</button>
      </form>
    </div>
  );
}
export default Login;