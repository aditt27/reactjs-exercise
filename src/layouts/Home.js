import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { HomeCard } from './HomeCard'

export class Home extends React.Component {

    render() {
        const cardsContent = [
            {
                key: '1',
                title: "Find University",
                description: "Find university information around the globe.",
                by: "universities.hipolabs.com",
                link: "/findUniversity"
            },
            {
                key: '2',
                title: "Country Public Holiday",
                description: "List of country general public holiday.",
                by: "date.nager.at",
                link: "/publicHoliday"
            }
        ]

        const titleStyle = {
            marginTop: '1em',
            marginBottom: '1em'
        }
        
        return(
            <div>
                <Container>
                    <h1 style={titleStyle}>Dashboard</h1>
                    <Row xs={1} md={3} className="g-4">
                        {cardsContent.map(item => (
                            <Col key={item.key}>
                            <HomeCard 
                                title={item.title} 
                                description={item.description} 
                                by={item.by}
                                link={item.link}                              
                            />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}