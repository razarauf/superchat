import React from 'react'
import "./App.css"
import "./Posts.css"

export default function Posts () {
    return (
        <div className='container'>
            <h5>The Superchat web app uses the following technologies:</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">React</li>
                <li className="list-group-item">React Router</li>
                <li className="list-group-item">Firebase</li>
                <li className="list-group-item">Firebase React Hooks</li>
                <li className="list-group-item">Firebase authentication</li>
                <li className="list-group-item">Firestore database</li>
                <li className="list-group-item">Firebase deploy and hosting</li>
                <li className="list-group-item">Bootstrap and Reactstrap</li>
            </ul>    
        </div>
    );
}