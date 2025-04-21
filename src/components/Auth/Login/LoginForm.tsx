"use client";
import * as React from "react";
import { useState } from "react";
import EmailInput from "./Emailinput";
import PasswordInput from "./Passwordinput";
import { GREEN_COLOR_BUTTON, LoginButton, RED_COLOR_BUTTON } from "@/components/Buttons/buttons";
import { useAuth } from "@/context/AuthContext";


const COVER_IMAGE = `bg-[url('/Login.png')] bg-cover`;


function LoginForm() {
  const { closeLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-[1285px] h-[674] flex flex-row  bg-[#00000066] rounded-4xl shadow-lg w-full max-w-4xl">
      <Information/>
      <Cover/>
    </div>
  );

  function Information() {
    return <div className="w-1/2 p-10 flex flex-col justify-center">

      <h1 className="text-center text-3xl font-bold text-white mb-6">
        Iniciar Sesión
      </h1>

      <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      <LoginButton onClick={closeLogin} className="self-center" />

      <p className="text-[16px] text-center text-white mt-4">
        ¿Olvidaste tu contraseña?{" "}
        <span className=" text-[20px] font-bold cursor-pointer ">Presiona aquí.</span>
      </p>

      <p className="text-[16px] text-center text-white mt-3">
        ¿No tienes una cuenta?{" "}
        <span className=" text-[20px] font-bold cursor-pointer ">Regístrate aquí</span>
      </p>

    </div>;
  }

  function Cover() {
    return <div className={`w-1/2 ${COVER_IMAGE} rounded-tr-4xl rounded-br-4xl`}>
      <CloseLoginButton />
    </div>;
  }

  function CloseLoginButton() {
    return <button onClick={closeLogin} className={` w-[35px] h-[35px] ${GREEN_COLOR_BUTTON} hover:${RED_COLOR_BUTTON} 
                                                 relative  top-[20px] right-[-85%]  rounded-full text-white shadow-lg border border-gray-200 `}>
      ✕
    </button>;
  }
}

export default LoginForm;
