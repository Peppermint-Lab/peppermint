import React from 'react'
import {
    useParams
  } from "react-router-dom";

import Navigation from '../Navigation'

const ViewTicket = props => {

    console.log(props)
    let { id } = useParams();
    console.log(id)


    return (
        <div>
            <Navigation />
        </div>
    )
}

export default ViewTicket
