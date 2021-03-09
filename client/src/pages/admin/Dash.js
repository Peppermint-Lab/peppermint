import React, { useState, useEffect } from "react";
import { Card, Statistic, List, Pagination  } from "antd";
import { useHistory } from "react-router-dom";
import io from 'socket.io-client';

const TicketStats = () => {
  const [unClaimed, setUnClaimed] = useState();
  const [open, setOpen] = useState();
  const [complete, setComplete] = useState();
  const [online, setOnline ] = useState(0);

  const history = useHistory();

  useEffect(() => {
    async function soc() {
      const socket = await io.connect("/")
      socket.on('visitor enters', data => setOnline({ data }));
      socket.on('visitor exits', data => setOnline({ data }));
    }
    soc()
  }, [])
  
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
          console.log(response)
          const res = response;
          if (res.auth === false ) {
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
    <div className="admin-dash-row">
      <div className="stats-card">
        <Card>
          <Statistic title="Closed Tickets" value={complete} />
        </Card>
      </div>
      <div className="stats-card">
        <Card>
          <Statistic title="Open Tickets" value={open} />
        </Card>
      </div>
      <div className="stats-card">
        <Card>
          <Statistic title="Unissued Tickets" value={unClaimed} />
        </Card>
      </div>
      <div className="stats-card">
        <Card>
          <Statistic title="Online Users" value={online.data} />
        </Card>
      </div>
    </div>
  );
};

const ApiLogger = () => {

  const [text, setText ] = useState([].reverse());

  useEffect(() => {
    async function soc() {
      const socket = await io.connect("/")
      socket.on('file', data => setText({ data }));
    }
    soc()
  }, [])

  return (
    <div className="api-log">
      <List
      size="small"
      bordered
      dataSource={text.data}
      pagination={{
        defaultPageSize: 15,
        showSizeChanger: true,
        pageSizeOptions: ["15", "30", "40"],
      }}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
    </div>
  )
}

const UserStats = () => {



  return (
    <div>

    </div>
  )
}

const Dash = () => {
  return (
    <div>
      <TicketStats />
      <ApiLogger />
      <UserStats />
    </div>
  );
};

export default Dash;
