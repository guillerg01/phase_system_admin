import Image from "next/image"
import { RegisterButton } from "../../Buttons/buttons"

const CHARGER_SERVICES_IMAGE = `bg-[url('/landingpage/services/charger-services.svg')] bg-cover`;
const ELECTRIC_CAR_SERVICES_IMAGE = `bg-[url('/landingpage/services/electric-car-services.svg')] bg-cover`;

const Services = () => {
    return (
        <div className="w-[80wv] h-[1020px] flex flex-col items-center justify-center border-b-4 border-white ">
            <h1 className="flex text-4xl text-white pt-20 text-center"><strong>Nuestros Servicios</strong></h1>
            <p className="flex text-white text-center">Explora los servicios que cubrimos en la plataforma de electromovilidad.</p>
            <div>
                <div className="grid grid-cols-2 gap-40">
                    <div className="flex flex-col">
                        <Image src={"/dve.png"} width={401} height={413} alt="" />
                        <RegisterButton  className={`-mt-10 self-center`} />
                        <p className="flex text-left text-white self-start pt-2">Lorem Ipsum <br /><br />
                            Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.<br />
                            Sed do eiusmod tempor <br />incididunt ut labore et dolore <br />magna aliqua.</p>
                        <div className={`${ELECTRIC_CAR_SERVICES_IMAGE} w-[401px] h-[413px] relative  top-[-500px] left-[-300px] `} />
                    </div>

                    <div className="flex flex-col">
                        <Image src={"/dce.png"} width={401} height={413} alt="" />
                        <RegisterButton className={`-mt-10 self-center`} />
                        <p className="flex text-right text-white self-end pt-2">Lorem Ipsum <br /><br />
                            Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.<br />
                            Sed do eiusmod tempor <br />incididunt ut labore et dolore <br />magna aliqua.</p>
                        <div className={`${CHARGER_SERVICES_IMAGE} w-[401px] h-[413px] relative  top-[-600px] left-[300px] `} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Services