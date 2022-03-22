import React from 'react'
import { Card } from 'react-bootstrap'

export class HomeCard extends React.Component {
    
    render() {
        const {
            title,
            description,
            by,
            link
        } = this.props

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text>Powered by: {by}</Card.Text>
                    <Card.Link href={link}>Go</Card.Link>
                </Card.Body>
            </Card>
        )
    }
}