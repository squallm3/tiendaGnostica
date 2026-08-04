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

export interface PersonajeNivel {
  nivelId: number;
  xpAcumulada: number;
  titulo: string | null;
  imagenA: string | null;
  imagenB: string | null;
}

interface AuthContextValue {
  usuario: User | null;
  token: string | null;
  cargando: boolean;
  personaje: PersonajeNivel | null;
  nivelUsuario: number;
}

const AuthContext = createContext<AuthContextValue>({
  usuario: null,
  token: null,
  cargando: true,
  personaje: null,
  nivelUsuario: 1,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [personaje, setPersonaje] = useState<PersonajeNivel | null>(null);

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

        try {
          const respuesta = await fetch("/api/usuarios/perfil", {
            headers: { Authorization: `Bearer ${idToken}` },
          });

          if (respuesta.ok) {
            const perfil = await respuesta.json();
            setPersonaje(perfil?.personaje ?? null);
          }
        } catch (error) {
          console.error("Error al traer el perfil:", error);
        }
      } else {
        setToken(null);
        setPersonaje(null);
      }

      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  // Sin sesion o sin personaje, se considera nivel 1
  const nivelUsuario = personaje?.nivelId ?? 1;

  return (
    <AuthContext.Provider
      value={{ usuario, token, cargando, personaje, nivelUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}