"use client";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "../Auth/Login/LoginForm";

export default function LoginModal() {
  const { isOpenLogin } = useAuth();
  return (
      <div
          className={`w-screen h-screen fixed inset-0 bg-[#00000000] backdrop-blur-sm flex items-center justify-center z-50 transform transition-transform duration-300 ease-out ${
              isOpenLogin ? "scale-100" : "scale-0"
          }`}
      >
        <LoginForm />
      </div>
  );
}
