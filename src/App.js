import React, { useState, useRef } from 'react';
import './App.css';
import { AgGridReact} from'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns'; 
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function App() {
  const [todo, setTodo] = useState({description:'', date: '', status:''});
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const text = day + "." + month + "." + year;
    setTodo({...todo, date: text});
  };

  const addTodo = () => {
    //Lisätään todos-taulukkoon uusi todo. Jos todo ennen ...todos, lisää taulukon alkuun
    setTodos([todo, ...todos]);
    setTodo({description:'', date: '', status:''});
  };

  const deleteTodo = (event) => {
    const newTodoList = todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex);
    setTodos(newTodoList);
  };

  const columns = [
    { headerName: 'Description', field: 'description', sortable: true, filter:true, floatingFilter:true },
    { headerName: 'Date', field: 'date', sortable: true, filter:true, floatingFilter: true },
    { headerName: 'Priority', field: 'status', sortable: true, filter:true, floatingFilter:true,
      cellStyle: params => params.value === "High" ? {color: 'red'}:{color:'black'} }
  ]

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            To Do-list
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="input">
        <TextField style={{margin: 5}} label="Description" 
          name="description" value={todo.description} 
          onChange={inputChanged} />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker style={{margin: 5}} label="Date" 
          name="date" value={selectedDate} 
          type="date"
          onChange={date => handleDateChange(date)} 
        />
        </MuiPickersUtilsProvider>
        <TextField style={{margin: 5}} label="Status" 
          name="status" value={todo.status} 
          onChange={inputChanged} />
        <Button 
          style={{margin: 5, marginTop: 10}} size="small" 
          variant="contained" color="primary" 
          onClick={addTodo}>Add
        </Button>
        <Button 
          style={{margin: 5, marginTop: 10}} size="small" 
          variant="contained" color="secondary" 
          onClick={deleteTodo}>Delete
        </Button>
        <div className="ag-theme-material" style={{width: '80%', height:'700px', margin:'auto'}}>
          <AgGridReact 
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api }
            rowSelection="single"
            animateRows={true} 
            columnDefs={columns}
            rowData={todos}>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default App;
