import React from 'react'
import "./App.css"

import {firebaseConfig} from '../config.js'

// firebase sdk
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//firebase hooks
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import {Button} from 'reactstrap';

const messageConverter = {
  toFirestore(message) {
      return { 
        createdAt: message.createdAt,
        photoURL: message.photoURL,
        text: message.text,
        uid: message.uid
      };
  },
  fromFirestore(snapshot, options) {
      const data = snapshot.data(options);
      return {
        createdAt: data.createdAt,
        photoURL: data.photoURL,
        text: data.text,
        uid: data.uid,
        id: snapshot.id
      };
  }
};

firebase.initializeApp(firebaseConfig);

export default function App() {

  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const [user] = useAuthState(auth);

  return (
    <div className="chat-container">
      <div className='chat-items'>
        {auth.currentUser && <SignOut />}
        {user ? <ChatRoom /> : <SignIn/> }
      </div>
    </div>
  );

  function ChatRoom(){
    const messagesRef = firestore.collection("messages").withConverter(messageConverter);
    const query = messagesRef.orderBy("createdAt").limit(25);
    const [messages] = useCollectionData(query)

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

      if (formValue === '')
        return;

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
      <form className='chat-input-container' onSubmit={sendMessage}>
          <input className='chat-input' onChange={e => setFormValue(e.target.value)} value={formValue} placeholder='say something'/>
          <Button color='primary' type="submit">Send</Button>
      </form>
      </>
    )
  }
  
  function ChatMessage(props){
    return(<p className='chat-message'>{props.message.text}</p>)
  }
  
  function SignIn(){
    function signInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <button color='success' onClick={signInWithGoogle}>Sign In</button>
    )
  }
  
  function SignOut(){
    return (<Button color='danger' onClick={() => {auth.signOut()}}>Sign Out</Button>)
  }
  
}
