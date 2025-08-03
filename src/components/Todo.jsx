import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todo.css";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (newTodo.trim() === "") return;
    const newTask = {
      id: uuidv4(),
      task: newTodo.trim(),
      isDone: false,
      createdAt: new Date().toISOString(),
      priority: "medium"
    };
    setTodos(prevTodos => [...prevTodos, newTask]);
    setNewTodo("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const deleteAllCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.isDone));
  };

  const markAllAsComplete = () => {
    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, isDone: true }))
    );
  };

  const setPriority = (id, priority) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  };

  const startEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = () => {
    if (editText.trim() === "") return;
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === editingId ? { ...todo, task: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case "active":
        return !todo.isDone;
      case "completed":
        return todo.isDone;
      default:
        return true;
    }
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (a.isDone !== b.isDone) {
      return a.isDone - b.isDone;
    }
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.isDone).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>📝 My Todo List</h1>
        <p className="todo-subtitle">Stay organized and productive</p>
      </div>

      <div className="todo-stats">
        <div className="stat">
          <span className="stat-number">{totalTodos}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-number">{activeTodos}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat">
          <span className="stat-number">{completedTodos}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="todo-input-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            className="todo-input"
          />
          <button onClick={addTask} className="add-btn" disabled={!newTodo.trim()}>
            Add Task
          </button>
        </div>
      </div>

      <div className="todo-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active ({activeTodos})
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed ({completedTodos})
        </button>
      </div>

      <div className="todo-actions">
        <button 
          onClick={markAllAsComplete} 
          className="action-btn"
          disabled={activeTodos === 0}
        >
          ✓ Complete All
        </button>
        <button 
          onClick={deleteAllCompleted} 
          className="action-btn danger"
          disabled={completedTodos === 0}
        >
          🗑️ Clear Completed
        </button>
      </div>

      <div className="todo-list">
        {sortedTodos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <h3>
              {filter === "completed" 
                ? "No completed tasks yet" 
                : filter === "active" 
                ? "No active tasks" 
                : "No tasks yet"}
            </h3>
            <p>
              {filter === "all" 
                ? "Add your first task above to get started!" 
                : `Switch to "All" to see all your tasks.`}
            </p>
          </div>
        ) : (
          <ul className="todo-items">
            {sortedTodos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.isDone ? "completed" : ""} priority-${todo.priority}`}>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={handleEditKeyPress}
                      onBlur={saveEdit}
                      className="edit-input"
                      autoFocus
                    />
                  ) : (
                    <span className="todo-text" onDoubleClick={() => startEdit(todo.id, todo.task)}>
                      {todo.task}
                    </span>
                  )}
                  
                  <div className={`priority-indicator priority-${todo.priority}`} title={`Priority: ${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}`}>
                    {todo.priority === "high" ? "🔥" : todo.priority === "medium" ? "⚠️" : "📌"}
                  </div>
                </div>

                <div className="todo-actions-row">
                  <select
                    value={todo.priority}
                    onChange={(e) => setPriority(todo.id, e.target.value)}
                    className="priority-select"
                    disabled={todo.isDone}
                  >
                    <option value="low">📌 Low Priority</option>
                    <option value="medium">⚠️ Medium Priority</option>
                    <option value="high">🔥 High Priority</option>
                  </select>
                  
                  {editingId === todo.id ? (
                    <div className="edit-actions">
                      <button onClick={saveEdit} className="save-btn">Save</button>
                      <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                    </div>
                  ) : (
                    <div className="item-actions">
                      <button
                        onClick={() => startEdit(todo.id, todo.task)}
                        className="edit-btn"
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="delete-btn"
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {totalTodos > 0 && (
        <div className="todo-footer">
          <p>Double-click on any task to edit it</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {completedTodos > 0 
              ? `${Math.round((completedTodos / totalTodos) * 100)}% completed` 
              : "Get started by completing your first task!"}
          </p>
        </div>
      )}
    </div>
  );
}
