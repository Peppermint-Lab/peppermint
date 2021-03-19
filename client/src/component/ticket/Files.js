import React, { useState, useEffect } from "react";
import { Space, Button } from "antd";
import {
  FileTwoTone,
  MinusCircleTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import FileSaver from "file-saver";

const Files = (props) => {
  const [files, setFiles] = useState([]);

  async function getFiles() {
    const id = props.ticket._id;
    await fetch(`/api/v1/tickets/file/listFiles/${id}`, {
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

  async function deleteFile(file) {
    await fetch(`/api/v1/tickets/file/del`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: file._id,
        ticket: props.ticket._id,
        path: file.path,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFiles(res.files);
      });
  }

  async function downloadFile(file) {
    const id = file.path;
    await fetch(`/api/v1/tickets/file/download/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    // FileSaver.saveAs(`/api/v1/tickets/file/download/${id}`, file.filename)
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div>
      {files.map((file) => {
        console.log(file);
        const id = file.path;
        const url = `/api/v1/tickets/file/download/${id}`;
        return (
          <div className="todo-list" key={file._id}>
            <ul style={{ marginLeft: -40 }}>
              <li>
                <Space>
                  <FileTwoTone />
                  <a href={url}>{file.filename}</a>
                  <Button
                    ghost
                    style={{ float: "right" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteFile(file);
                    }}
                  >
                    <MinusCircleTwoTone twoToneColor="#FF0000	" />
                  </Button>
                  <Button
                    ghost
                    onClick={async (e) => {
                      e.stopPropagation();
                      downloadFile(file);
                    }}
                  >
                    <UploadOutlined style={{ color: "black" }} />
                  </Button>
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
