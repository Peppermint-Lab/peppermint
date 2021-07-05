import React, { useState, useEffect } from "react";
import fileDownload from "js-file-download";
import axios from "axios";
import { TrashIcon, DocumentDownloadIcon } from "@heroicons/react/solid";

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
        {files ? (
          files.map((file) => {
            return (
              <div className="w-full" key={file.id}>
                <ul>
                  <li>
                    <span>{file.filename}</span>
                    <button
                    onClick={() => download(file)}
                      type="button"
                      className="float-right  border border-transparent rounded-full shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <DocumentDownloadIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => deleteFile(file)}
                      type="button"
                      className="mr-1 float-right border border-transparent rounded-full shadow-sm text-red-600 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {/* <Button
                      ghost
                      style={{ float: "right" }}
                      onClick={async (e) => {
                        e.stopPropagation();
                        download(file);
                      }}
                    >
                      <UploadOutlined style={{ color: "black" }} />
                    </Button> */}
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <p>No files found</p>
        )}
      </div>
    </div>
  );
};

export default Files;
