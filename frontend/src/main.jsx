import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import keycloak from "./keycloak";

keycloak.init({
  onLoad: 'check-sso',
  pkceMethod: 'S256',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
}).then(authenticated => {
  if (authenticated && window.location.pathname === "/") {
    window.location.href = "/app";
  }

  const root = document.getElementById("root");
  if (root) {
    ReactDOM.createRoot(root).render(<App />);
  }
}).catch(() => {
  console.error("Keycloak init failed");
});
