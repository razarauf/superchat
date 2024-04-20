import React from 'react'
import "./App.css"
import "./Posts.css"

import {firebaseConfig} from '../config.js'

// firebase sdk
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//firebase hooks
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection, useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp(firebaseConfig);

export default function Posts () {
    const auth = firebase.auth();
    const firestore = firebase.firestore();

    const [user] = useAuthState(auth);

    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);

    query.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
        });
    });

    // const [messages] = useCollection(query, {idField: 'id'})

    console.log("POSTS");

    return (
        <div className='chat-container'>
            <h3>posts</h3>
        </div>
    );
}