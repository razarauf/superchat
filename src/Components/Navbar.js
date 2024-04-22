import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import {firebaseConfig} from '../config.js'

import firebase from 'firebase/compat/app';

firebase.initializeApp(firebaseConfig);

function Navibar(args) {

    const auth = firebase.auth();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
        <Navbar {...args} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
            <NavbarBrand href="/">Home</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink className="text-dark" href="/posts">Posts</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="text-dark" onClick={signInWithGoogle}>Sign In</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="text-dark" onClick={() => {auth.signOut()}}>Sign Out</NavLink>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
        </div>
    );

    function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
}

export default Navibar;