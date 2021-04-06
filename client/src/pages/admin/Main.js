import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { Card, Statistic, List } from "antd";

const Main = () => {
  const [unClaimed, setUnClaimed] = useState();
  const [open, setOpen] = useState();
  const [complete, setComplete] = useState();
  const [online, setOnline] = useState(0);
  const [text, setText] = useState([].reverse());

  const history = useHistory();

  useEffect(() => {
    async function soc() {
      const socket = await io.connect("/");
      socket.on("visitor enters", (data) => setOnline({ data }));
      socket.on("visitor exits", (data) => setOnline({ data }));
    }
    soc();
  }, []);

  useEffect(() => {
    async function soc() {
      const socket = await io.connect("/");
      socket.on("file", (data) => setText({ data }));
    }
    soc();
  }, []);

  useEffect(() => {
    async function auth() {
      await fetch(`/api/v1/auth/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          const res = response;
          if (res.auth === false) {
            history.push("/login");
          } else {
            return console.log("logged in");
          }
        });
    }
    auth();
    // eslint-disable-next-line
  }, []);

  const fetchOpen = async () => {
    await fetch(`/api/v1/data/getallopen`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setOpen(result.result);
      });
  };

  const fetchClosed = async () => {
    await fetch(`/api/v1/data/getallcompleted`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setComplete(result.result);
      });
  };

  const fetchUnissued = async () => {
    await fetch(`/api/v1/data/unallocatedTickets`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUnClaimed(result.result);
      });
  };

  useEffect(() => {
    fetchOpen();
    fetchClosed();
    fetchUnissued();
  }, []);

  return (
    <div>
      <main
        className="relative z-0 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="flex flex-row px-2 mx-auto justify-items-center ">
                <div className="ml-1">
                  <Card>
                    <Statistic title="Closed Tickets" value={complete} />
                  </Card>
                </div>
                <div className="ml-1">
                  <Card>
                    <Statistic title="Open Tickets" value={open} />
                  </Card>
                </div>
                <div className="ml-1">
                  <Card>
                    <Statistic title="Unissued Tickets" value={unClaimed} />
                  </Card>
                </div>
                <div className="ml-1">
                  <Card>
                    <Statistic title="Online Users" value={online.data} />
                  </Card>
                </div>
              </div>
            </div>
            <div className="flex py-1 px-3">
              <div className="flex:1">
                <List
                  size="small"
                  bordered
                  dataSource={text.data}
                  pagination={{
                    defaultPageSize: 15,
                    showSizeChanger: true,
                    pageSizeOptions: ["15", "30", "40"],
                  }}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </div>
              <div className="flex:2 ml-5">
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
