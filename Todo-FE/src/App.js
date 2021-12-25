import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState, React, useRef } from "react";
import { getOneTodo, getTodos,addTodo, updateTodo, removeOneTodo, removeAllTodo } from "./services.js";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "./components/alert";
function App() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [addStatus, setAddStautus] = useState(true);
  const [currentTodo, setCurrentTodo] = useState({"content":""});
  const [sort,setSort]=useState('des');
  const loadData = async (sort='des') => {
    const callTodos = await getTodos(sort);
    if (!callTodos) return;
    setTodos(callTodos);
  };
  const handleContent = (event)=>{
    const {value,name}= event.target;
    setCurrentTodo(preState=>{return {...preState,[name]:value}})

  }
  useEffect(() => {
    loadData();
  }, []);
  const addNew= async()=>{
    setCurrentTodo({"content":""})
    await addOrUpdate()
  }
  const addOrUpdate = async () => {
    let todo;
    let status= true;
    if(currentTodo.id){ 
      todo = await updateTodo(currentTodo.id,currentTodo);
      if(!todo) status= false;
      if (todo){ 
        setCurrentTodo(todo);
        loadData()
      }
    }
    else {
      todo = await addTodo(currentTodo);
      if(!todo) status= false; 
      if (todo){ setCurrentTodo(todo);  loadData() };
    }
    
    setOpen(true);
    setAddStautus(status);
  };
  const onKeyPress = (e)=>{
    if(e.key == 'Enter'){ addOrUpdate()} 
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleDeleteOne=async(id)=>{
    await removeOneTodo(id)
    loadData()
  }
  const clear = () =>{ 
    setCurrentTodo({"content":""})

  }
  const edit=(todo)=>{
    setCurrentTodo(todo);
  }
  const deleteAll=()=>{
    let status= true;
    const deletes = removeAllTodo();
    if(!deletes) status =false
    setOpen(true);
    setAddStautus(status);
    loadData()

  }
  const sorting=()=>{
      if(sort==="asc"){
        setSort('des')
      }
      else setSort('asc')
      loadData(sort)

  }
  return (
    <div className="App">
      <header className="App-header">
        <h1> Work To-dos </h1>
      </header>
      <div className="container">
        <div className="input-group col-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="New Item"
            aria-describedby="basic-addon1"
            name="content"
            value={currentTodo.content}
            onKeyPress={onKeyPress}
            onChange={handleContent}
          />
          <Button variant="outlined" onClick={clear}>
              &times;
          </Button>
          <Button variant="outlined" onClick={sorting}>
              Sorting
          </Button>
          <Button variant="outlined" className="btn btn-danger" onClick={deleteAll}>
             Delete all
          </Button>          
        </div>
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             {addStatus? <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Success
              </Alert>:
              <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Fail
            </Alert>
              }
            </Snackbar>
            {todos.map((todo,index) => {
              return <Alert key={index} severity="info" onClose={() => {handleDeleteOne(todo.id)}} icon={false} onClick={()=>{edit(todo)}} >{todo.content}</Alert>;
            })}
          </Stack>
      </div>
    </div>
  );
}

export default App;
