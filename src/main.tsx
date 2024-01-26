import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/styles/index.css";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
