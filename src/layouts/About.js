import React from 'react'
import { Container } from 'react-bootstrap';
import Breadcrumber from './Breadcrumber';

export const About = () => {

    const breadcrumb = [
        {
            key: '1',
            name: 'About'
        }
    ]

    const titleStyle = {
        marginBottom: '1em'
    }


    return <Container>
        <Breadcrumber crumbs={breadcrumb}/>
            <h1 style={titleStyle}>About</h1>

            <p>Created By Aditya Budi Laksono</p>
    </Container>;
};