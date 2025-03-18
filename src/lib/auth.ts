import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "master",
  clientId: "nextjs-app",
});

export const initAuth = async () => {
  return keycloak.init({ onLoad: "login-required", checkLoginIframe: true }).then((authenticated) => {
    if (authenticated) {
      document.cookie = `auth_token=${keycloak.token}; Path=/; Domain=localhost; Secure; SameSite=None`;
    }
    return keycloak;
  });
};
