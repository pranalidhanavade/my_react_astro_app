import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

// Initialize Keycloak
const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "master",
  clientId: "nextjs-app",
});



const Login: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);



  useEffect(() => {
    keycloak
      .init({ onLoad: "check-sso", checkLoginIframe: true })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          setUser({
            name: keycloak.tokenParsed?.preferred_username,
            email: keycloak.tokenParsed?.email,
          });

          // Store token in a cookie for session sharing
          document.cookie = `auth_token=${keycloak.token}; Path=/; Domain=.example.com; Secure; HttpOnly; SameSite=None`;
        }
      })
      .catch((error) => console.error("Keycloak initialization error:", error));
  }, []);

  const handleLogin = () => {
    keycloak.login();
  };

  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <div className="container">
      <h1>Welcome to Example.com</h1>
      {isAuthenticated ? (
        <>
          <p>✅ Logged in as {user?.name} ({user?.email})</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>❌ Not logged in</p>
          <button onClick={handleLogin}>Login with Keycloak</button>
        </>
      )}
    </div>
  );
};

export default Login;
