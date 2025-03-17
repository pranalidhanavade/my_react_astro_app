import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ✅ Prevent page reload
  
    console.log("Login button clicked"); // Debugging log
  
    if (email === "admin@example.com" && password === "password") {
      console.log("Credentials are correct! Redirecting...");
  
      localStorage.setItem("auth", "true");
  
      // ✅ Ensure redirection works properly
      setTimeout(() => {
        window.location.href = "/dashboard"; // or use window.location.replace
      }, 0);
    } else {
      console.log("Invalid credentials!");
      alert("Invalid Credentials");
    }
  };
  

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
  );
};

export default Login;
