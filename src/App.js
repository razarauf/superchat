import React from 'react'
import "./index.css"

import {firebaseConfig} from './config.js'

// firebase sdk
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//firebase hooks
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp(firebaseConfig);

export default function App() {

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        {auth.currentUser && <SignOut />}
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn/> }
      </section>
    </div>
  );

  function ChatRoom(){
    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'})

    return (
      <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <MessageInput />
      </>
    )
  }

  function MessageInput (prop) {
    const messagesRef = firestore.collection("messages");
    const [formValue, setFormValue] = React.useState('')
    
    const sendMessage = async (e) => {
      e.preventDefault();

      const {uid, photoURL} = auth.currentUser;

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      setFormValue('')
    }

    return (
      <>
      <form onSubmit={sendMessage}>
        <input onChange={e => setFormValue(e.target.value)} value={formValue} placeholder='say something'/>
        <button type="submit">Send</button>
      </form>
      </>
    )
  }
  
  function ChatMessage(props){
    return(<p>{props.message.text}</p>)
  }
  
  function SignIn(){
    function signInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <button onClick={signInWithGoogle}>Sign In</button>
    )
  }
  
  function SignOut(){
    return (<button onClick={() => {auth.signOut()}}>Sign Out</button>)
  }
  
}
