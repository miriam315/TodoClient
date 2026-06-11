import React, { useState } from 'react';
import service from './service';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Register() {
  const [name, setName] = useState("");
  const [pas, setPas] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await service.register(name, pas);
    alert("נרשמת בהצלחה! כעת התחבר");
    navigate('/login');
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>הרשמה</h2>
      <input placeholder="שם משתמש" onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="סיסמה" onChange={(e) => setPas(e.target.value)} />
      <button type="submit">הירשם</button>
    </form>
  );
}
export default Register;