import React from "react";
import { Container, Header } from "rsuite";

import Navigation from "../component/Navigation";

const Home = () => {
  return (
    <div>
      <Container>
        <Header>
          <Navigation />
        </Header>
      </Container>
    </div>
  );
};

export default Home;
