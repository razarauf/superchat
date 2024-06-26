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
        <Navbar {...args} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container color='dark' dark={true}>
            <NavbarBrand href="/">Superchat</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
            <Nav className="d-flex justify-content-end" navbar>
                <NavItem>
                    <NavLink className="text-light" href="/aboutus">About Us</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="text-light" type='button' onClick={signOut}>Sign Out</NavLink>
                </NavItem> 
                : 
                <NavItem>
                    <NavLink className="text-light" type='button' onClick={signInWithGoogle}>Sign In</NavLink>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
    );



    function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch((error) => console.log(error));
    }

    function signOut(){
        auth.signOut().catch((error) => console.log(error));
    }
}

export default Navibar;