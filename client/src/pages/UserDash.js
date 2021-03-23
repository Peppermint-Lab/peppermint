import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Main from "../components/home/Main";
import Header from '../components/navigation/Header'

const UserDash = () => {
  const history = useHistory();

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Main />
    </div>
  );
};

export default UserDash;
