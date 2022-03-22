import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from "react-router-dom";

export const Main = () => {
    return (
        <div>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand href="#home">Adit</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </div> 
    )
};

export const About = () => {
    return <h1>Blog Articles</h1>;
};

export const NoPage = () => {
    return <Container>
        <h1 style={{margin: '10px'}}>404</h1>
    </Container>;
};
