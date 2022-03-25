import { Table, Button as ButtonAntd} from 'antd'
import axios from 'axios'
import React from 'react'
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import Breadcrumber from './Breadcrumber'

export class University extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            univName: '',
            univNameCb: false,
            univCountry: 'Indonesia',
            univCountryCb: true,
            data: [],
            loading: false,
            firstTime: true,
        }
    }

    onChange = (e)=> {
        this.setState({
            [e.target.name]: e.target.value,
            requestChange: true
        })
    }

    onChangeCb = (e)=> {
        this.setState({
            [e.target.name]: e.target.checked
        })
    }

    resetInput = (e)=> {
        this.setState({
            [e.target.name]: ''
        })
    }

    onSubmit = ()=> {
        this.setState({loading: true})

        const { 
            univName,
            univNameCb,
            univCountry,
            univCountryCb,
        } = this.state

        var params = {}
        if(univNameCb) {
            params.name = univName
        }
        if(univCountryCb) {
            params.country = univCountry
        }

        axios.get('http://universities.hipolabs.com/search', { params: params })
            .then(result=> {   
                if(result.status === 200) {
                    var data = []
                    var id = 0
                    result.data.forEach(item=> {
                        data.push({
                            key: ++id,
                            name: item.name,
                            webpage: item.web_pages[0],
                            stateprovince: item['state-province'],
                            country: item.country
                        })
                    })
                    this.setState({
                        data, 
                        loading: false, 
                        firstTime: false,
                    })
                }
            })

    }

    render() {

        const { 
            univName,
            univNameCb,
            univCountry,
            univCountryCb,
            data,
            loading,
            firstTime,
        } = this.state

        const titleStyle = {
            marginBottom: '1em'
        }

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Web Page',
                dataIndex: 'webpage',
                key: 'webpage'
            },
            {
                title: 'State Province',
                dataIndex: 'stateprovince',
                key: 'stateprovince'
            },
            {
                title: 'Country',
                dataIndex: 'country',
                key: 'country'
            },
        ]

        const breadcrumb = [
            {
                key: '1',
                name: 'Find University'
            }
        ]

        let bodyResponse;
        if(!firstTime) {
            bodyResponse = <Table columns={columns} dataSource={data} loading={loading}/>
        } else {
            bodyResponse = <p>Please input your request first.</p>
        }

        return(
            <Container>
                <Breadcrumber crumbs={breadcrumb}/>
                <h1 style={titleStyle}>Find University</h1>
                <Row className='mb-4'>
                    <Col>
                        <Card>
                            <Card.Header>Request</Card.Header>
                            <Card.Body>
                                <p>Search university by:</p>
                                <Form>
                                    <Form.Group>
                                        <InputGroup className="mb-3" >
                                            <InputGroup.Checkbox name='univNameCb' checked={univNameCb} onChange={this.onChangeCb}/>
                                            <InputGroup.Text>Name: </InputGroup.Text>
                                            <FormControl name='univName' onChange={this.onChange} value={univName} />
                                            <Button name='univName' variant="outline-secondary" onClick={this.resetInput}>x</Button>
                                        </InputGroup>
                                    </Form.Group>
                                    
                                    <Form.Group>
                                        <InputGroup className="mb-3" >
                                            <InputGroup.Checkbox name='univCountryCb' checked={univCountryCb} onChange={this.onChangeCb}/>
                                            <InputGroup.Text>Country: </InputGroup.Text>
                                            <FormControl name='univCountry' onChange={this.onChange} value={univCountry}/>
                                            <Button name='univCountry' variant="outline-secondary" onClick={this.resetInput}>x</Button>
                                        </InputGroup>
                                        <ButtonAntd type="primary" size='large' className='float-end' onClick={this.onSubmit} loading={loading}>Submit</ButtonAntd>
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
}