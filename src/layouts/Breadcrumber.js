import { Breadcrumb } from 'antd'
import React from 'react'

const Breadcrumber = (props)=> {
    const crumbs = props.crumbs
    return <Breadcrumb style={{marginTop: '20px'}}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {
            crumbs.map(element => (
                <Breadcrumb.Item key={element.key}>{element.name}</Breadcrumb.Item>
            ))
        }

  </Breadcrumb>
}

export default Breadcrumber