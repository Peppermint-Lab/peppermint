import React from 'react'
import { Navbar, Nav, Icon, Tooltip, Whisper} from 'rsuite'
import {useHistory} from 'react-router-dom'

const Navigation = () => {

    const history = useHistory()

    const tooltip = (
        <Tooltip>
            Create a new Ticket here
        </Tooltip>
    )

    return (
        <div>
            <Navbar>
                <Navbar.Header>
                <p href="#" className="navbar-brand logo">Project Winter</p>
                </Navbar.Header>
            <Navbar.Body>
            <Nav>
                <Nav.Item icon={<Icon icon="home" />} onClick={() => history.push('/')}>Home</Nav.Item>
                <Nav.Item onClick={() => history.push('/tickets')}>Tickets</Nav.Item>
                <Nav.Item onClick={() => history.push('/monitor')}>Monitoring</Nav.Item>
            </Nav>
            <Nav pullRight>
                <Whisper placement="bottom" trigger="hover" speaker={tooltip}>
                    <Nav.Item icon={<Icon icon="plus" />} />
                </Whisper>

                <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
            </Nav>
            </Navbar.Body>
            </Navbar>
        </div>
    )
}

export default Navigation
