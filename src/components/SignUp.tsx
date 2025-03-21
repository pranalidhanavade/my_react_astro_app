"use client";
import React, { useState } from "react";
import { getToken } from "../lib/keycloak";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const adminTokenResponse = await getToken({
        client_id: "nextjs-app",
        client_secret: "lR3JLiHgTCSSI8mpE4dJ7Z7R6qNd2iyT",
        grant_type: "client_credentials",
      });

      const adminTokenData = await adminTokenResponse.json();
      if (!adminTokenResponse.ok) throw new Error(adminTokenData.error_description || "Failed to get admin token");

      const userResponse = await fetch("http://192.168.1.121:8080/admin/realms/master/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminTokenData.access_token}`,
        },
        body: JSON.stringify({
          username: email,
          email,
          credentials: [{ type: "password", value: password, temporary: false }],
        }),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.errorMessage || "Failed to create user");
      }

      alert("Account created successfully!");
      if(redirectTo){
        window.location.href = `/login?redirectTo=${encodeURIComponent(redirectTo)}`;
      }
      else {
        window.location.href = '/login'
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
       <h1>Welcome to Sovio</h1>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Submit"}</button>
      </form>
      <p>
        Already have an account?{" "}
        <a href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}>Login</a>
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
          h2 {
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
            background-color: #007bff;
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
            background-color: #0056b3;
          }
          .error {
            color: red;
            margin-bottom: 10px;
          }
          p {
            margin-top: 10px;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
