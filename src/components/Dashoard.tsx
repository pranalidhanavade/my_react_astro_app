import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      window.location.href = "/login"; // Redirect only if auth fails
    }
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Prevent render flicker
  }

  return (
    <div className="container">
      <h2>Welcome to the Dashboard</h2>
      <p>You are successfully logged in.</p>
    </div>
  );
};

export default Dashboard;
