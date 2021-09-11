import React from 'react'
import {Redirect} from 'react-router-dom'

function index(props) {
    return (
        <Redirect to = '/login' />
    )
}

export default index

