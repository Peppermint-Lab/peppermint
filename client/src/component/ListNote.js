import React, { useState, useEffect, useContext } from "react";
import { Button } from "rsuite";

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
      {notes.map((item) => {
        // console.log(item)
        return (
          <div key={item._id} className="todo-list">
            <ul>
              <li style={{ marginLeft: -35 }}>
                {item.title}
                <Button size="xs" style={{float: "right", marginLeft: 5}} onClick={() => deleteNote(item._id)}>Delete</Button>
                <Button size="xs" style={{ float: "right", marginLeft: 5 }}>
                  Edit
                </Button>
                <Button size="xs" style={{ float: "right", marginLeft: 5 }}>
                  View
                </Button>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ListNote;
