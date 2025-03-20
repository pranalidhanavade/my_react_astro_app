import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};
  useEffect(() => {
    
    const auth = getCookie("session");
    console.log("Reached document.cookie", document.cookie)
    console.log("Reached inside auth", auth)
    if (auth) {
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
