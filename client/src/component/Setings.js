import React,{useContext} from 'react'
import { Button } from 'antd';
import { useHistory } from "react-router-dom";
// import {UserContext} from '../App'

const Setings = () => {
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/login");
  }

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Setings;
