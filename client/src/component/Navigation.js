import React, { useEffect, useState } from "react";
import { Navbar, Nav, Icon, Tooltip, Whisper, Modal } from "rsuite";
import { useHistory } from "react-router-dom";

import Settings from "./Setings";
import NewTicket from "./NewTicket";

const Navigation = () => {
  const history = useHistory();

  const tooltip = <Tooltip>Create a new Ticket here</Tooltip>;

  const [ticketmodalIsOpen, setTicketIsOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openTicketModal() {
    setTicketIsOpen(true);
  }

  function closeTicketModal() {
    setTicketIsOpen(false);
  }

  function isAdmin() {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user == "admin") {
      setCheckAdmin(true)
    } else {
      setCheckAdmin(false)
      return;
    }
  };

  useEffect(()=>{
    isAdmin()
  },[])



  const Render = () => {

    if(checkAdmin) {
      return(
      <div>
        <Navbar>
        <Navbar.Header>
          <p href="#" className="navbar-brand logo">
            Project Winter
          </p>
        </Navbar.Header>
        <Navbar.Body>
          <Nav>
            <Nav.Item
              icon={<Icon icon="home" />}
              onClick={() => history.push("/")}
            >
              Home
            </Nav.Item>

            <Nav.Item onClick={() => history.push("/tickets")}>
              Tickets
            </Nav.Item>

            <Nav.Item
              onClick={() => history.push("/timesheet")}
              disabled={true}
            >
              TimeSheet
            </Nav.Item>

            <Nav.Item onClick={() => history.push("/admin")} disabled={false}>
              Admin
            </Nav.Item>
          </Nav>

          <Nav pullRight>
            <Whisper placement="bottom" trigger="hover" speaker={tooltip}>
              <Nav.Item icon={<Icon icon="plus" />} onClick={openTicketModal}>
                <Modal
                  show={ticketmodalIsOpen}
                  onHide={closeTicketModal}
                  keyboard={true}
                >
                  <h2 style={{ textAlign: "center" }}>New ticket</h2>
                  <Modal.Body>
                    <NewTicket />
                  </Modal.Body>
                </Modal>
              </Nav.Item>
            </Whisper>

            <Nav.Item icon={<Icon icon="cog" />} onClick={openModal}>
              <Modal show={modalIsOpen} onHide={closeModal}>
                <h2>Settings</h2>
                <Modal.Body>
                  <Settings />
                </Modal.Body>
              </Modal>
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
      </div>
      )
    } else {
      return (
      <div>
        <Navbar>
        <Navbar.Header>
          <p href="#" className="navbar-brand logo">
            Project Winter
          </p>
        </Navbar.Header>
        <Navbar.Body>
          <Nav>
            <Nav.Item
              icon={<Icon icon="home" />}
              onClick={() => history.push("/")}
            >
              Home
            </Nav.Item>

            <Nav.Item onClick={() => history.push("/tickets")}>
              Tickets
            </Nav.Item>

            <Nav.Item
              onClick={() => history.push("/timesheet")}
              disabled={true}
            >
              TimeSheet
            </Nav.Item>
          </Nav>

          <Nav pullRight>
            <Whisper placement="bottom" trigger="hover" speaker={tooltip}>
              <Nav.Item icon={<Icon icon="plus" />} onClick={openTicketModal}>
                <Modal
                  show={ticketmodalIsOpen}
                  onHide={closeTicketModal}
                  keyboard={true}
                >
                  <h2 style={{ textAlign: "center" }}>New ticket</h2>
                  <Modal.Body>
                    <NewTicket />
                  </Modal.Body>
                </Modal>
              </Nav.Item>
            </Whisper>

            <Nav.Item icon={<Icon icon="cog" />} onClick={openModal}>
              <Modal show={modalIsOpen} onHide={closeModal}>
                <h2>Settings</h2>
                <Modal.Body>
                  <Settings />
                </Modal.Body>
              </Modal>
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
        
      </div>
      )
    }
  }

  return (
    <div>
        <Render />
    </div>
  );
};

export default Navigation;
