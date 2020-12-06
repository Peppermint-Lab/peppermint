import React, { useEffect, useState } from "react";
import { Divider } from "rsuite";

import { baseUrl } from "../utils";

const Open = () => {
  
  const [data, setData] = useState([]);

  async function loadContent() {
    await fetch(`${baseUrl}/api/v1/data/openTickets`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.result);
      });
  }

  useEffect(() => {
    async function resolve() {
      await loadContent();
    }
    resolve();
  }, []);

  return (
    <div>
      <div className="inside-issue-con">
        <h4>Open Issues - {data}</h4>
      </div>
      <Divider />
    </div>
  );
};

const Unissued = () => {
  const [data, setData] = useState([]);

  async function loadContent() {
    await fetch(`${baseUrl}/api/v1/data/unallocatedTickets`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.result);
      });
  }

  useEffect(() => {
    async function resolve() {
      await loadContent();
    }
    resolve();
  }, []);

  return (
    <div>
      <div className="inside-issue-con">
        <h4>Unallocated Issues - {data}</h4>
      </div>
      <Divider />
    </div>
  );
};

const Completed = () => {
  const [data, setData] = useState([]);

  async function loadContent() {
    await fetch(`${baseUrl}/api/v1/data/completedTickets`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.result);
      });
  }

  useEffect(() => {
    async function resolve() {
      await loadContent();
    }
    resolve();
  }, []);
  
  return (
    <div>
      <div className="inside-issue-con">
        <h4>Completed Tickets - {data}</h4>
      </div>
    </div>
  );
};

const TicketStats = () => {
  return (
    <div>
      <h3>Current Issues</h3>
      <Divider />
      <Open />
      <Unissued />
      <Completed />
    </div>
  );
};

export default TicketStats;
