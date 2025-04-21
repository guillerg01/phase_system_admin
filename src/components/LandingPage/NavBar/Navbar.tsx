'use client'
import Link from "next/link"
import { CustomButton, LoginButton, RegisterButton } from "../../Buttons/buttons"
import Logo from "./Logo"
import { useAuth } from "@/context/AuthContext";



const Navbar = () => {

    const { openLogin , openRegister } = useAuth();
    return (
        <header className=" fixed w-[80vw]  h-[100px] 
                           flex items-center justify-between pl-40 pr-40 
                           bg-[#00000066] backdrop-blur-[7.2px] backdrop-brightness-[100%] 
                           border-b border-gray-500 z-20">
            <Logo />
            <div className="flex items-center justify-between gap-5 text-white text-[20px] ">
                <Link href={"#"}>Inicio</Link>
                <Link href={"#"}>Servivios</Link>
                <Link href={"#"}>Ubicaciones</Link>
            </div>
            <div className="flex justify-between gap-5">
                <LoginButton  onClick={openLogin}/>
                <RegisterButton  onClick={openRegister} />
            </div>
        </header>
    )
}
export default Navbar


