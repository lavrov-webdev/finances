import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(isBetween);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
