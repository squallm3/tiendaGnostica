"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { sincronizarUsuario } from "@/lib/api";

interface AuthContextValue {
  usuario: User | null;
  token: string | null;
  cargando: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  usuario: null,
  token: null,
  cargando: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);

      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);

        try {
          await sincronizarUsuario(idToken);
        } catch (error) {
          console.error("Error al sincronizar usuario:", error);
        }
      } else {
        setToken(null);
      }

      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}