import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import firebase from './firebase'
import {getAuth} from 'firebase/auth'
import UserContext from '../UserContext'

import { createRoot } from 'react-dom/client'
console.log('reactversion',React.version )


const userInfo = getAuth();

const container = document.getElementById("root")
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <UserContext.Provider value={userInfo}>
            <Router>
                <App />
            </Router>
        </UserContext.Provider>
    </React.StrictMode>
)
