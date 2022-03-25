import React, { useEffect, useState } from 'react'
import { Button as ButtonAntd, Table} from 'antd'
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import Breadcrumber from './Breadcrumber'
import axios from 'axios'

export const Holiday = ()=> {

    const [holidayYear, setHolidayYear] = useState(new Date().getFullYear())
    const [holidayCountry, setHolidayCountry] = useState('ID')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [responseState, setResponseState] = useState('')

    const onChange = (e)=> {
        switch(e.target.name) {
            case 'holidayYear':
                return setHolidayYear(e.target.value)
            case 'holidayCountry':
                return setHolidayCountry(e.target.value)
            default:
                break;
        }
    }

    

    useEffect(()=> {
        setResponseState('requestChange')
    }, [holidayCountry, holidayYear])

    useEffect(()=> {
        setResponseState('first')
    }, [])

    const resetInput = (e)=> {
        setHolidayCountry('')
    }

    const onSubmit = ()=> {
        setLoading(true)

        let url = 'https://date.nager.at/api/v2/publicholidays/'
        url = url.concat(holidayYear).concat('/').concat(holidayCountry)

        axios.get(url).then(result=> {
            if(result.status === 200){
                var id = 0;
                setData(result.data.map(item=> {
                    return {
                        ...item,
                        key: ++id
                    }
                }))
                setResponseState('success')
                setLoading(false)
            }
        }).catch(()=> {
                setResponseState('error')
                setLoading(false)
        })
    }

    const breadcrumb = [
        {
            key: '1',
            name: 'Public Holiday'
        }
    ]

    const titleStyle = {
        marginBottom: '1em'
    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Local Name',
            dataIndex: 'localName',
            key: 'localname'
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Launch Year',
            dataIndex: 'launchYear',
            key: 'launchyear'
        },
    ]

    let bodyResponse;
    switch(responseState) {
        case 'first':
            bodyResponse = <p>Please input your request first.</p>
            break;
        case 'success': 
            bodyResponse = <Table columns={columns} dataSource={data} loading={loading}/>
            break;
        case 'error':
            bodyResponse = <div>
                <p style={{color: 'red'}}>Your last request is invalid.</p>
                <Table columns={columns} dataSource={data} loading={loading}/>
            </div>
            break;
        case 'requestChange':
            bodyResponse = <div>
                <p>Your request has change. please re-submit.</p>
                <Table columns={columns} dataSource={data} loading={loading}/>
            </div>
            break;
        default:
            break;
    }


    return (
        <Container>
            <Breadcrumber crumbs={breadcrumb}/>
            <h1 style={titleStyle}>Public Holiday</h1>
            <Row className='mb-4'>
                <Col>
                    <Card>
                        <Card.Header>Request</Card.Header>
                        <Card.Body>
                            <p>Search holiday by country:</p>
                            <Form>
                                <Form.Group>
                                    <InputGroup className="mb-3" >
                                        <InputGroup.Text>Year: </InputGroup.Text>
                                        <FormControl type='number' name='holidayYear' onChange={onChange} value={holidayYear} />
                                    </InputGroup>
                                </Form.Group>
                                
                                <Form.Group>
                                    <InputGroup className="mb-3" >
                                        <InputGroup.Text>Country Code: </InputGroup.Text>
                                        <FormControl name='holidayCountry' onChange={onChange} value={holidayCountry} maxLength='2' />
                                        <Button name='holidayCountry' variant="outline-secondary" onClick={resetInput}>x</Button>
                                    </InputGroup>
                                    <ButtonAntd type="primary" size='large' className='float-end' onClick={onSubmit} loading={loading}>Submit</ButtonAntd>
                                </Form.Group>                                       
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Header>Response</Card.Header>
                        <Card.Body>
                            {bodyResponse}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>               
        </Container>
    )
}