import React from 'react'


const TicketInfo = (props) => {

    console.log(props)

    const data = props 
    
    return (
        <div>
            
            <div className="top-left">
            {data.issue}
            </div>

            <div className="top-right">

            </div>

            <div className="bottom-right">

            </div>

            <div className="bottom-left">

            </div>

        </div>
    )
}

export default TicketInfo
