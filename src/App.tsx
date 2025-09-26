import { useEffect, useState } from 'react'
import './App.css'
import AddTodo from './components/AddTodo'
import localforage from 'localforage'

type Task = {
  text: string;
  completed: boolean;
}

type Todo = {
  title: string;
  completion?: number;
  color: number,
  tasks: Task[]
};

export const colors = ["#6A5ACD", "#20B2AA", "#FF8C00", "#2E8B57", "#DC143C", "#4682B4", "#FF1493"];

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localforage.getItem<Todo[]>("todos").then((saved) => {
      if (saved) setTodos(saved);
    });
  }, []);

  useEffect(() => {
    localforage.setItem("todos", todos);
  }, [todos]);

  const addTodo = (title: string, color: number) => {
    setTodos([{ title, color, tasks: [] }, ...todos]);
  };

  const addTask = (todoIndex: number, text: string) => {
   const newTodos = [...todos];
   newTodos[todoIndex].tasks.push({ text, completed: false });
   setTodos(newTodos);
  };

  const toggleTask = (todoIndex: number, taskIndex: number) => {
    const newTodos = [...todos];
    newTodos[todoIndex].tasks[taskIndex].completed = !newTodos[todoIndex].tasks[taskIndex].completed;
    setTodos(newTodos);
  }

  return(
    <div>
      <div>
        <h1>Zwisker Todo 🎯</h1>
        <p>Less chaos, more focus.</p>

        <button onClick={() => setIsModalOpen(true)}>
          Add Todo
        </button>
      </div>
      
      <AddTodo 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addTodo}
        />

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        marginTop: "15px",
        maxWidth: "700px",
        justifyContent: "center"
        }}>
        {todos.map((todo, i) => (
          <div key={i}
          style={{
            background: colors[todo.color],
            borderRadius: "12px",
            padding: "10px"
          }}>
            <h3>{todo.title}</h3>
            <button
              onClick={() => {
                const task = prompt("Enter task:");
                if (task) addTask(i, task);
              }}>
                Add Task
            </button>
            <ul>
              {todo.tasks.map((task, j) => (
                <li key={j}
                style={{
                  textDecoration: task.completed ? "line-through" : "none"
                }}>
                  {task.text}
                  <button
                    onClick={() => {toggleTask(i, j)}}
                    >
                      {task.completed ? "Undo" : "Done"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>  
    </div>
  )
  
}

export default App
