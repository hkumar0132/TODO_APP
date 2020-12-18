import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import db from './Firebase';
import firebase from 'firebase';
import './App.css';
import Todo from './Todo';

/*
 Few things that can be added to this app ->
 * Timing of every todo
 * Authorization and authentication
 * Email reminder of every todo
 * Night mode
 * Data analysis -
   a. % tasks completed on time - daily, weekly, monthly....
   b. % tasks completed - daily, weekly, monthly....
   c. Most productive days of week
   d. Most productive hours of the day
 * Daily email reminder to schedule taks for the day
*/


function addStyle() {
  return {
    marginBottom: `10px`,
    fontSize: `30px`
  };
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    });
  }, []);

  const addTodo = (event) => {
    
    event.preventDefault();

    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  
    setInput('');
  }

  return (
    <div className="App">
      <h1> TODO App 🚀 </h1>

      <form>
        <FormControl>
          <InputLabel htmlFor="my-input"><b>✔️ Write a TODO</b></InputLabel>
          <Input style = {addStyle()} value = {input} onChange = {event => setInput(event.target.value)} />
        </FormControl>
        <Button disabled = {input === ''} type = "submit" onClick = {addTodo} variant = "contained" color = "primary">
          Add Todo
        </Button>
      </form>
      
      <div>
        {
          todos.map(todo =>   
          (<Todo text = {todo} />)
          )
        }
      </div>

    </div>  
  );
}

export default App;
