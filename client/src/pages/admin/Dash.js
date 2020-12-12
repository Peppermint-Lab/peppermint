import React, {useState, useEffect } from "react";
import { Card, Statistic, Row } from "antd";

import { baseUrl } from "../../utils";

const TicketStats = () => {

  const [api, setApi] = useState()

  const sessions = () => {
    fetch(`${baseUrl}/api/v1/data/sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.json())
    .then(res => {
      console.log(res)
      setApi(res)
    })
  }

  console.log(api)

  useEffect(() => {
    sessions();
  })

  return (
    <Row>
        <div className="stats-card">
          <Card>
            <Statistic title="Closed Tickets" value={112893} />
          </Card>
        </div>
        <div className="stats-card">
          <Card >
            <Statistic title="Open Tickets" value={112893} />
          </Card>
        </div>
        <div className="stats-card">
          <Card >
            <Statistic title="Unclaimed Tickets" value={112893} />
          </Card>
        </div>
        <div className="stats-card">
          <Card >
            <Statistic title="Active Sessions" value={api} />
          </Card>
        </div>
    </Row>
  );
};

const Dash = () => {
  return (
    <div>
      <TicketStats />
    </div>
  );
};

export default Dash;
