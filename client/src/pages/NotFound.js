import React from "react";

import error from "../assets/404.svg";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <img src={error} className="h-1/2 w-1/2" alt="404" />
    </div>
  );
};

export default NotFound;
