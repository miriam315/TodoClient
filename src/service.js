import axios from 'axios';

// 1. יצירת מופע של axios עם כתובת הבסיס של השרת
const apiClient = axios.create({
  baseURL:process.env.REACT_APP_SERVER_ADDRESS
});

// 2. Interceptor לבקשות (Request) - הוספת הטוקן לכל בקשה
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor לתגובות (Response) - טיפול בשגיאת 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("לא מורשה - מפנה להתחברות");
      localStorage.removeItem('token'); // מחיקת טוקן לא תקין
      window.location.href = '/login';   // העברה לדף התחברות
    }
    return Promise.reject(error);
  }
);

// 4. ייצוא פונקציות השירות
export default {
  // התחברות
login: async (name, pas) => {
    // השמות כאן חייבים להתאים בדיוק לשמות במחלקה User.cs ב-C#
    const response = await apiClient.post('/login', { 
        name: name,      // תואם ל-User.Name
        password: pas    // תואם ל-User.Password
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  register: async (name, pas) => {
    return await apiClient.post('/register', { 
        name: name, 
        password: pas 
    });
  },

  // משימות (דורשות טוקן)
  getTasks: async () => {
    const result = await apiClient.get('/items');
    return result.data;
  },

  addTask: async (name) => {
    const result = await apiClient.post('/items', { 
        name: name, 
        isComplete: false 
    });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    await apiClient.put(`/items/${id}`, { 
        isComplete: isComplete 
    });
    return {};
  },

  deleteTask: async (id) => {
    await apiClient.delete(`/items/${id}`);
    return {};
  }
};