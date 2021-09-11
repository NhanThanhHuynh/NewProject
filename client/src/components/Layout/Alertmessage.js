import React from 'react'
import { Alert } from 'react-bootstrap'

const Alertmessage = ({info}) => {
    return info == null?  null : (
        <Alert variant ={`${info.type}`} >{info.message} </Alert>
    )
}

export default Alertmessage
