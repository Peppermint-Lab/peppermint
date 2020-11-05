import React from 'react'
import { Navbar, Nav, Icon} from 'rsuite'
import {useHistory} from 'react-router-dom'

const Navigation = () => {

    const history = useHistory()

    return (
        <div>
            <Navbar>
                <Navbar.Header>
                <a href="#" className="navbar-brand logo">Project White</a>
                </Navbar.Header>
            <Navbar.Body>
            <Nav>
                <Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item>
                <Nav.Item onClick={() => history.push('/tickets')}>Tickets</Nav.Item>
                <Nav.Item>Wiki</Nav.Item>
                <Nav.Item>Monitoring</Nav.Item>
            </Nav>
            <Nav pullRight>
                <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
            </Nav>
            </Navbar.Body>
            </Navbar>
        </div>
    )
}

export default Navigation
