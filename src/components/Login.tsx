import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";
import { getLoginToken, getToken } from "../lib/keycloak";
// import { setToCookies } from "../lib/auth";


const Login: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    console.log("This is email inside");
  
      e.preventDefault();
      setLoading(true);
      setError("");
      console.log("This is email inside 1");
  
      try {
        const adminTokenResponse = await getLoginToken({
      client_id: "nextjs-app",
      client_secret: "lR3JLiHgTCSSI8mpE4dJ7Z7R6qNd2iyT",
      email,
      password,
      grant_type: 'client_credentials'
      
  })
    console.log("This is email inside 2");
  
        const adminTokenData = await adminTokenResponse.json();
        if (!adminTokenResponse.ok) throw new Error(adminTokenData.error_description || "Failed to get admin token");
        console.log("This is email inside 3");
  
        console.log("This is email", email);
        console.log("This is adminTokenData.access_token", JSON.stringify(adminTokenData.access_token));
        
        document.cookie = `session=${adminTokenData.access_token}; path=/;`;
        // document.cookie = `session=${adminTokenData.access_token}; path=/;domain=http://192.168.1.125:4321;`;


        alert("Account logged in successfully!");
        window.location.href = "/dashboard";
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

  const handleLogout = () => {
  };

  return (
    <div className="container">
    <h1>Welcome to Example.com</h1>
      <button type="submit" onSubmit={handleLogin}>I am here</button>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" onSubmit={handleLogin}>Submit</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Login;
