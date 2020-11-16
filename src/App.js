import React, { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState({description:'', date:''});
  const [todos, setTodos] = useState([]);

  const descriptionChanged = (event) => {
    setTodo({...todo, description: event.target.value});
  };

  const dateChanged = (event) => {
    setTodo({...todo, date: event.target.value});
  };

  const addTodo = () => {
    //Lisätään todos-taulukkoon uusi todo. Jos todo ennen ...todos, lisää taulukon alkuun
    setTodos([todo, ...todos]);
    setTodo({description:'', date:''});
  };

  const deleteTodo = (event) => {
    const index = parseInt(event.target.id);
    const newTodoList = todos.filter((todo, i) => i !== index)
    setTodos(newTodoList);
  };

  return (
    <div className="App">
      <div className="input">
        <p>Add todo:</p>
        <label>Description: </label><input name="description" value={todo.description} onChange={descriptionChanged} />
        <label>Date: </label><input name="date" value={todo.date} onChange={dateChanged} />
        <button onClick={addTodo}>Add</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Date</th><th>Description</th>
          </tr>
          {
            todos.map((todo, index)=>
            <tr key={index}>
              <td>{todo.date}</td>
              <td>{todo.description}</td>
              <td><button id={index} onClick={deleteTodo}>Delete</button></td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
