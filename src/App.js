import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTodos() {
    try {
      setLoading(true);
      const data = await service.getTasks();
      setTodos(data);
    } catch (error) {
      console.error("שגיאה בטעינת משימות", error);
      // ה-Interceptor ב-service.js יטפל בהעברה ל-login במקרה של 401
    } finally {
      setLoading(false);
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await service.addTask(newTodo);
    setNewTodo(""); 
    await getTodos();
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();
  }

  useEffect(() => {
    // בדיקה אם יש טוקן לפני ניסיון טעינה
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      getTodos();
    }
  }, []);

  if (loading && localStorage.getItem('token')) {
    return <div>טוען משימות...</div>;
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>התנתק</button>
        <form onSubmit={createTodo}>
          <input 
            className="new-todo" 
            placeholder="מה צריך לעשות היום?" 
            value={newTodo} 
            onChange={(e) => setNewTodo(e.target.value)} 
          />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => (
            <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
              <div className="view">
                <input 
                  className="toggle" 
                  type="checkbox" 
                  checked={todo.isComplete || false} 
                  onChange={(e) => updateCompleted(todo, e.target.checked)} 
                />
                <label>{todo.name}</label>
                <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App;