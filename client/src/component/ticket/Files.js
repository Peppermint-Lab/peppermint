import React, { useState, useEffect } from "react";
import { Space } from "antd";

import { FileTwoTone } from "@ant-design/icons";

const Files = (props) => {
  const [files, setFiles] = useState([]);
  const [id, setId] = useState(props.ticket._id);

  console.log(files, id);

  async function getFiles() {
    await fetch(`/api/v1/uploads/files/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFiles(res.files);
      });
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div>
      {files.map((file) => {
        console.log(file);
        return (
          <div className="todo-list" key={file._id}>
            <ul style={{ marginLeft: -40 }}>
              <li>
                <Space>
                  <FileTwoTone />
                  <span>{file.filename}</span>
                </Space>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Files;
