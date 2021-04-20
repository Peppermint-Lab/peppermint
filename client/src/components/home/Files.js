import React, { useState, useEffect } from "react";
import { Space, Button } from "antd";
import fileDownload from "js-file-download";
import axios from "axios";
import {
  FileTwoTone,
  MinusCircleTwoTone,
  UploadOutlined,
} from "@ant-design/icons";

const Files = () => {

  const [files, setFiles] = useState([]);

  async function getFiles() {
    await fetch(`/api/v1/auth/file/listFiles`, {
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
    await fetch(`/api/v1/auth/file/del`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: file.id,
        path: file.path,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setFiles(res.files);
      });
  }

  function download(file) {
    const url = `/api/v1/auth/file/download`;
    let data = new FormData();
    data.append("filepath", file.path);
    axios
      .post(url, data, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, file.filename);
      });
  }

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div>
      <div className="flow-root p-5 mx-auto -mt-5 ml-1">
      {files ? files.map((file) => {
        return (
          <div className="w-full" key={file._id}>
            <ul>
              <li>
                <Space>
                  <FileTwoTone />
                  <span>{file.filename}</span>
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
                      download(file);
                    }}
                  >
                    <UploadOutlined style={{ color: "black" }} />
                  </Button>
                </Space>
              </li>
            </ul>
          </div>
        );
      }) : (
        <p>No files found</p>
      )}
      </div>
    </div>
  );
};

export default Files;
