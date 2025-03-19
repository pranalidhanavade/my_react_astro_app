"use-client"
import React, { useState } from "react";
import { getToken } from "../lib/keycloak";

const Signup: React.FC = () => {
  console.log("This is email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const abc = ()=>{
    console.log("opopdpsodpsaodpsaodpas");
  }

  const handleSignup = async (e: React.FormEvent) => {
  console.log("This is email inside");

    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // http://192.168.1.121:8080/admin/realms/master/users
      const adminTokenResponse = await getToken({
    client_id: "nextjs-app",
    client_secret: "9CtfKaOTk4DygJHUqBJ0rx87fQahzEqy"
})

      const adminTokenData = await adminTokenResponse.json();
      if (!adminTokenResponse.ok) throw new Error(adminTokenData.error_description || "Failed to get admin token");

      console.log("This is email", email);

      const userResponse = await fetch("http://192.168.1.121:8080/admin/realms/master/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminTokenData.access_token}`,
        },
        body: JSON.stringify({
          username: email,
          email,
          password,
        }),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.errorMessage || "Failed to create user");
      }

      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <button type="submit" onSubmit={abc}>I am here</button>
      {error && <p className="error">{error}</p>}
      <form onSubmit={abc}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" onSubmit={abc}>Submit</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
