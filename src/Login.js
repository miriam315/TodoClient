import React, { useState } from 'react';
import service from './service';
import { useNavigate, Link } from 'react-router-dom'; // הוספתי Link כדי שיהיה יפה
import './Login.css';

function Login() {
  const [name, setName] = useState("");
  const [pas, setPas] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ניסיון התחברות
      await service.login(name, pas);
      
      // התחברות הצליחה - מעבר לדף הבית
      navigate('/'); 
    } catch (error) {
      // התחברות נכשלה
      alert("שם משתמש או סיסמה שגויים");
      // מרוקן את שדה הסיסמה כדי שהמשתמש יקליד שוב
      setPas(""); 
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>התחברות</h2>
        <input 
           placeholder="שם משתמש" 
           value={name} 
           onChange={(e) => setName(e.target.value)} 
           required 
        />
        <input 
           type="password" 
           placeholder="סיסמה" 
           value={pas} 
           onChange={(e) => setPas(e.target.value)} 
           required 
        />
        <button type="submit">התחבר</button>
        
        {/* שיניתי ל-Link כדי שישתלב יפה עם ה-Router */}
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <Link to="/register">אין לך משתמש? הירשם כאן</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;