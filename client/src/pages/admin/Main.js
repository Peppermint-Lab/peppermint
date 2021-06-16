import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { Card, Statistic } from "antd";

const Main = () => {
  const [unClaimed, setUnClaimed] = useState();
  const [open, setOpen] = useState();
  const [complete, setComplete] = useState();
  const [online, setOnline] = useState(0);
  const [text, setText] = useState([].reverse());
  const [data, setData] = useState([]);

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
    async function soc() {
      const socket = await io.connect("/");
      socket.on("stats", (data) => setData(data));
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
          <div className="max-w-7xl mx-auto sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 ml-3">
              Dashboard
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="flex flex-col px-2 py-2 m-4 justify-items-center lg:flex-row">
                <div className="ml-1 mt-2">
                  <Card>
                    <Statistic title="Closed Tickets" value={complete} />
                  </Card>
                </div>
                <div className="ml-1 mt-2">
                  <Card>
                    <Statistic title="Open Tickets" value={open} />
                  </Card>
                </div>
                <div className="ml-1 mt-2">
                  <Card>
                    <Statistic title="Unissued Tickets" value={unClaimed} />
                  </Card>
                </div>
                <div className="ml-1 mt-2">
                  <Card>
                    <Statistic title="Online Users" value={online.data} />
                  </Card>
                </div>
                <div className="ml-1 mt-2">
                  <Card>
                    <Statistic title="System OS" value={data.system} />
                  </Card>
                </div>
                <div className="ml-1 mt-2">
                  <Card>
                    <Statistic title="Cpu Count" value={data.cpu} />
                  </Card>
                </div>
              </div>
            </div>
            <div className="flex py-1 px-2">
              <div className="flex">
                <div className="flex-col">
                  <div className="flex flex-col px-2 py-2 m-4 justify-items-center lg:flex-row">
                    <div className="ml-1 mt-2">
                      <Card>
                        <Statistic
                          title="Cpu Load Average 5mins %"
                          value={data.loadAverage}
                        />
                      </Card>
                    </div>
                    <div className="ml-1 mt-2">
                      <Card>
                        <Statistic title="Uptime" value={data.uptime} />
                      </Card>
                    </div>
                    <div className="ml-1 mt-2">
                    <Card>
                      <Statistic title="Free Memory MB" value={data.freeMem} />
                    </Card>
                  </div>
                  <div className="ml-1 mt-2">
                    <Card>
                      <Statistic
                        title="Free Memory %"
                        value={data.freeMemPercentage}
                      />
                    </Card>
                  </div>
                  <div className="ml-1 mt-2">
                    <Card>
                      <Statistic
                        title="Total Memory MB"
                        value={data.totalMem}
                      />
                    </Card>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
