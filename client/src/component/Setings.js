import React,{useContext} from 'react'
import { Button } from "rsuite";
import { useHistory } from "react-router-dom";
import {UserContext} from '../App'

const Setings = () => {
  const history = useHistory();
  const {dispatch} = useContext(UserContext)

  function logout() {
    localStorage.clear();
    dispatch({type:"CLEAR"})
    history.push("/Login");
  }

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Setings;
