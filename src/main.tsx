import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Using ReactDOM.createRoot to create a root in the DOM
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Wrapping the App component with React.StrictMode
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
