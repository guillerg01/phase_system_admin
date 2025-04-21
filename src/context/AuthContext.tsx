"use client";

import { createContext, useContext, useState } from "react";

type AuthContextType = {
  isOpenLogin: boolean;
  isOpenRegister: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  openRegister: () => void;
  closeRegister: () => void;
  handleLogin: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const openLogin = () => setIsOpenLogin(true);
  const closeLogin = () => setIsOpenLogin(false);

  const openRegister = () => setIsOpenRegister(true);
  const closeRegister = () => setIsOpenRegister(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log("Logging in with:", email, password);
      closeLogin();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{   isOpenLogin, openLogin, closeLogin, handleLogin , isOpenRegister, openRegister , closeRegister  }}>
      {children}
    </AuthContext.Provider>
  );



}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}


