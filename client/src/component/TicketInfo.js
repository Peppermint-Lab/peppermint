import React from 'react'
import {Container } from 'rsuite'


const TicketInfo = (props) => {

    const data = props.info
    
    console.log(data)

    return (
        <div>
            <Container>
                <div className="top-left">
                    <p>{data.issue}</p>
                </div>
            </Container>

            <div className="top-right">
            <p>{data.name}</p>
            </div>

            <div className="bottom-right">

            </div>

            <Container>
                <div className="bottom-left">
                    {data.company}
                </div>
            </Container>

        </div>
    )
}

export default TicketInfo
