import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Todo(){
    let [ Todos,setTodos]=useState([{task:"sample-task", id: uuidv4(), isDone: false}]);
    let [newTodo,setNewTodo] = useState("");
    
    let addTask = ()=>{
      if(newTodo==="") return;
      setTodos((prevTodos)=>{
        return [...prevTodos, { task: newTodo, id: uuidv4(), isDone:false}];
      });
      setNewTodo("");
    };


    let updateTodoValue =(e)=>{
      setNewTodo(e.target.value);
    };

    let deleteTodo =(id)=>{
      setTodos((prevTodos)=> Todos.filter((prevTodos)=>prevTodos.id!=id));
    }

 

    let upperCaseAll=()=>{
      setTodos( (prevTodos)=>(
        prevTodos.map((todo)=>{
          return {
            ...todo,
            task:todo.task.toUpperCase()

          };
        })
      

        // Todos.map((todo)=>{ //updating old value
        //   return {
        //     ...todo,
        //     task:todo.task.toUpperCase()
        //   };
        // })
      ));
    };

    let markasDone=()=>{
      setTodos( (prevTodos)=>(
        prevTodos.map((todo)=>{
          return {
            ...todo,
            isDone:true

          };
        })
      ));
    };

    let upperCaseOne = (id)=>{
      setTodos((prevTodos)=>(
        prevTodos.map((todo)=>{
          if(todo.id===id){
            return{
              ...todo,
              task:todo.task.toUpperCase()
            }
          }
          else{
            return todo;
          }
        })
      ));
    };

    let doneTask=(id)=>{
      setTodos((prevTodos)=>(
        prevTodos.map((todo)=>{
          if(todo.id===id){
            return{
              ...todo,
              isDone:true
            }
          }
          else{
            return todo;
          }
        })
      ));
      
    }

    return (
      <>
        <h1>Todo Task</h1>
        <input
          type="text"
          placeholder="Enter task"
          value={newTodo}
          onChange={updateTodoValue}
        />

        <button onClick={addTask}>Add Task</button>

        <h3>Todo List</h3>
        <ul>
          {Todos.map((todo) => (
            <li key={todo.id}>
              <span 
                style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
                {todo.task}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => upperCaseOne(todo.id)}>
                upperCaseOne
              </button>
              <button onClick={() => doneTask(todo.id)}>Done Task</button>
            </li>
          ))}
          <button onClick={() => upperCaseAll()}>UpperCaseAll</button>
          <button onClick={()=> markasDone()}>Task Done</button>
        </ul>
      </>
    );
}