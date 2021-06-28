import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { GlobalProvider } from "./Context/GlobalState";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
