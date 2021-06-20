import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      history.push("/login");
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
        .then((res) => res.json())
        .then(res => {
          if (res.auth === false) {
            history.push("/login");
          } 
        });
    }
    auth();
    // eslint-disable-next-line
  }, []);

  return <div>{children}</div>;
};

export default CheckAuth;
