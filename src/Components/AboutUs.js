import React from 'react'
import "./App.css"
import "./Posts.css"

export default function Posts () {
    return (
        <div className='container'>
            <h5>The Superchat web app uses the following technologies:</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">React</li>
                <li class="list-group-item">React Router</li>
                <li class="list-group-item">Firebase</li>
                <li class="list-group-item">Firebase React Hooks</li>
                <li class="list-group-item">Firebase authentication</li>
                <li class="list-group-item">Firestore database</li>
                <li class="list-group-item">Firebase deploy and hosting</li>
                <li class="list-group-item">Bootstrap and Reactstrap</li>
            </ul>    
        </div>
    );
}