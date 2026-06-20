import React, { useState } from 'react';
import service from './service';
import { useNavigate, Link } from 'react-router-dom'; // הוספנו את Link
import './Login.css';

function Register() {
  const [name, setName] = useState("");
  const [pas, setPas] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      await service.register(name, pas);
      alert("נרשמת בהצלחה! כעת התחבר");
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // שינינו מעט את ההודעה כדי להכווין את המשתמש
        alert("שם המשתמש כבר תפוס. אנא בחר שם אחר או עבור לדף ההתחברות.");
      } else {
        alert("אירעה שגיאה במהלך ההרשמה. אנא נסה שוב מאוחר יותר.");
        console.error("Registration error:", error);
      }
    }
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleRegister}>
        <h2>הרשמה</h2>
        <input placeholder="שם משתמש" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="password" placeholder="סיסמה" value={pas} onChange={(e) => setPas(e.target.value)} required />
        <button type="submit">הירשם</button>
        
        <hr /> {/* קו הפרדה עיצוב קטן */}
        
        {/* אזור הניווט החדש שהוספנו */}
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <button type="button" onClick={() => navigate('/')} style={{ marginBottom: '10px' }}>
            חזור לדף הבית
          </button>
          <p>
            כבר רשום? <Link to="/login">התחבר כאן</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;