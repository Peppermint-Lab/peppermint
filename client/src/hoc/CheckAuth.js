import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      history.push("/login");
    } else {
      return true;
    }
  });

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

  return <div>{children}</div>;
};

export default CheckAuth;
