"use client";
import React, { useState } from "react";
import { getLoginToken } from "../lib/keycloak";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const adminTokenResponse = await getLoginToken({
        client_id: "nextjs-app",
        client_secret: "lR3JLiHgTCSSI8mpE4dJ7Z7R6qNd2iyT",
        email,
        password,
        grant_type: "client_credentials",
      });

      const adminTokenData = await adminTokenResponse.json();
      if (!adminTokenResponse.ok) throw new Error(adminTokenData.error_description || "Failed to get admin token");

      document.cookie = `session=${adminTokenData.access_token}; path=/;`;

      alert("Account logged in successfully!");
      window.location.href = redirectTo;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Sovio</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Submit"}</button>
      </form>
      <p>
        Dont' have an account?{" "}
        <a href={`/signup`}>Sign up</a>
      </p>
      <style>
        {`
          .container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h1 {
            margin-bottom: 20px;
            color: #333;
          }
          form {
            display: flex;
            flex-direction: column;
          }
          input {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
          }
          button {
            padding: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.3s;
          }
          button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
          button:hover:not(:disabled) {
            background-color: #218838;
          }
          .error {
            color: red;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
