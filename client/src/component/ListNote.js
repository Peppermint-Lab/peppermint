import React, { useState, useEffect, useContext } from "react";
import { Button, Skeleton } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import Popup from 'reactjs-popup';

//import { baseUrl } from "../utils";
import { GlobalContext } from "../Context/GlobalState";

const ListNote = () => {
  const { notes, getNotes, deleteNote } = useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const openView = () => setIsViewOpen(true);
  const viewClose = () => setIsViewOpen(false);

  // console.log(notes)

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {notes ? notes.map((item) => {
        // console.log(item)
        return (
          <div key={item._id} className="todo-list">
            <ul>
              <li style={{ marginLeft: -35 }}>
                {item.title}
                <Button size="xs" style={{float: "right", marginLeft: 5}} onClick={() => deleteNote(item._id)}><DeleteTwoTone twoToneColor="#FF0000" /></Button>
                <Button size="xs" style={{float: "right", marginLeft: 5}} onClick={open}>
                  Edit
                  <Popup modal open={isOpen} closeOnEscape={true}>
                  <div className="modal">
                    <Button className="close" onClick={close}>
                        &times;
                    </Button>
                  </div>
                  </Popup>
                  </Button>
                <Button size="xs" style={{float: "right", marginLeft: 5}} onClick={openView}>
                  View
                  <Popup modal open={isViewOpen} closeOnEscape={true}>
                  <div className="modal">
                    <Button className="close" onClick={viewClose}>
                      &times;
                    </Button>
                      <div className="header"> 
                        <h3>{item.title}</h3>
                      </div>
                      <div className="content">
                        <h5>{item.note}</h5>
                      </div>
                    </div>
                  </Popup>
                  </Button>
              </li>
            </ul>
          </div>
        );
      }) : <Skeleton />}
    </div>
  );
};

export default ListNote;
