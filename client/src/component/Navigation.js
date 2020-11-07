import React, { useState } from 'react'
import { Navbar, Nav, Icon, Tooltip, Whisper, Button, Modal} from 'rsuite'
import {useHistory} from 'react-router-dom'

// import Settings from "./Setings"

const Navigation = () => {

    const history = useHistory()

    const tooltip = (
        <Tooltip>
            Create a new Ticket here
        </Tooltip>
    )  

    const [modalIsOpen, setIsOpen] = useState(false);

    console.log(modalIsOpen)

    function openModal() {
        setIsOpen(true);
    }
 
    function closeModal(){
        setIsOpen(false);
    }


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

                <Nav.Item icon={<Icon icon="cog" /> } onClick={openModal}>
                <Modal show={modalIsOpen} onHide={closeModal}>       
                    <h2>Settings</h2>
                    <Modal.Header>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Test</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={closeModal} appearance="primary">
                            Ok
                            </Button>
                            <Button onClick={closeModal} appearance="subtle">
                            Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Nav.Item>
            </Nav>
            </Navbar.Body>
            </Navbar>
        </div>
    )
}

export default Navigation
