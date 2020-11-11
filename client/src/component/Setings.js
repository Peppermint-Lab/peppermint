import React from "react";
import { Button } from "rsuite";
import { useHistory } from "react-router-dom";

const Setings = () => {

  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push('/Login')
  }

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Setings;
