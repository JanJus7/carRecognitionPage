import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/",
  realm: "carx",
  clientId: "frontend",
});

export default keycloak;
