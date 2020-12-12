import React from "react";
import { Card, Statistic, Row } from "antd";

// import { baseUrl } from "../../utils";

const TicketStats = () => {

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
            <Statistic title="Active Sessions" value={3} />
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
