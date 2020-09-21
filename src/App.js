import React,{useState,useEffect} from 'react';
import './App.css';
import {Button,FormControl} from "@material-ui/core";
import {Input} from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import {SendIcon} from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

function App() {
  // This is called state 
  //[variable,setVariable]  = useState(Initital value of the variable)
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([
    // {"username":"Akhil","message":"Hey rockstar!"},
  ]);
  //messages is an array of objects
  //each object of form: {key:val,key:val}

  const [username,setUsername] = useState("");
  
  //fundamentals
  // useState  "creating a variable in react"
  // useEffect "runs a block of code based on a condition"

  //  db.collection(collection_name).onSnapshot( snapshot => {
  //   function on snapshot
  // } )

  useEffect( ()=>{
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
      //onSnapshot() is a listener that runs whenever database gets any changes
      //snapshot represents an array of all documents inside the collection
      //setMessages(param), param = [object1,object2,...]
      //snapshot.docs is an array of all docs
      //for each doc, doc.data() gives an object {username: ,message:} 
      setMessages(snapshot.docs.map(doc=> ({
        id: doc.id,
        message: doc.data(),
      }
  
        ) ));
      setInput("");
    })
  },[] );

  useEffect(()=>{
    setUsername(prompt("Enter your name"))
  },[]);
  // [] is the set of conditions,when empty it runs when the app component loads.

  const sendMessage = (event)=>{
    event.preventDefault(); //To prevent page from refreshing on form submission
    //Sendings props to the message component
    // const messageObject = {
    //   username:username,
    //   message:input,
    // };
    //push the object into the  database as a new document in the collection.
    db.collection('messages').add({
      username:username,
      message: input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setMessages([...messages,{username:username,message:input}]);
    // setInput("");
  };

  return (
    <div className="App">
      <h1>Hi {username}! Welcome to Facebook messenger clone!!</h1>
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt="facebook icon"/>
      <small className="app__owner">by Akhil</small>
      <form className="app__form">
        {/*form submits on hitting enter*/}
        {/*disadvantage of a form: refreshes the page on hitting enter*/}
        {/*So,we preventDefault to prevent that*/}
        <FormControl className="app__formcontrol">
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)}/>          
          <Button 
              disabled={!input} 
              variant="contained" 
              color="primary" 
              type="submit" 
              onClick={sendMessage} 
              >Send
          </Button>        
        </FormControl>
      </form>

      {
        messages.map( ({id,message}) => ( 
          <Message key={id} username={username} messageObject={message} />
          //when key is a prop,the state change depends on uniqueness of key.
          //so,previously rendered messages doesnt get re-rendered
          //so efficiency increased. 
        ))
      }

    </div>
  );
}

export default App;
