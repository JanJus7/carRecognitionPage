import { Navigate } from "react-router-dom";
import keycloak from "./keycloak";

export default function PrivateRoute({ children }) {
  return keycloak.authenticated ? children : <Navigate to="/" />;
}
