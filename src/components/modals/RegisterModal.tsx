"use client";
import RegistrationForm from "@/components/Auth/Register/RegistrationForm";
import { useAuth } from "@/context/AuthContext";

export default function RegisterModal() {
    const { isOpenRegister } = useAuth();
    return (
        <div
            className={`w-screen h-screen fixed inset-0 bg-[#00000000] backdrop-blur-sm flex items-center justify-center z-50 transform transition-transform duration-300 ease-out ${
                isOpenRegister ? "scale-100" : "scale-0"
            }`}
        >
            <RegistrationForm />
        </div>
    );
}