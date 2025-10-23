import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  roles: string[];
}

export function useAuth() {
  const [roles, setRoles] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setRoles(decoded.roles);
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
    }
  }, []);

  return { roles, isAuthenticated };
}
