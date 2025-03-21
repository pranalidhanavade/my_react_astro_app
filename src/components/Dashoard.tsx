import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getCookie = (name: string) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
          return decodeURIComponent(value);
        }
      }
      return null;
    };

    const session = getCookie("session");
    if (session) {
      setIsAuthenticated(true);
    } else {
      window.location.href = "/login"; 
    }
  }, []);

  return (
    <div className="dashboard-container">
      {isAuthenticated ? <h2>Welcome to Astro Dashboard</h2> : <p>Loading...</p>}
      
      <style>
        {`
          .dashboard-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            background: #f5f5f5;
          }
          h2 {
            color: #333;
            font-size: 24px;
            font-weight: bold;
          }
          p {
            color: #666;
            font-size: 18px;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
