import Image from "next/image"

const Information = () => {
    const VEA = "17.200";
    const CED = "9.550"
    const VDP = "12.000"
    return (

        <div className="w-[80wv] h-[700px] flex flex-col items-center justify-start">
            <Image className="relative top-[-345px]" src={"/young_lady.png"} width={734} height={491} alt="" />
            <div className=" relative top-[-345px] w-[80vw] flex flex-row gap-5 justify-evenly items-center ">
                <div className="flex flex-col items-center justify-center text-center gap-4">
                    <h1 className="text-[64px] text-white"><strong>{VEA} +</strong></h1>
                    <p className="font-light text-[32px] text-white">Vehículos Eléctricos <br /> Asociados</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-4">
                    <h1 className="text-[64px] text-white"><strong>{CED} +</strong></h1>
                    <p className="font-light text-[32px] text-white">Cargadores Eléctricos <br /> Desplegados  </p>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-4">
                    <h1 className="text-[64px] text-white"><strong>{VDP} +</strong></h1>
                    <p className="font-light text-[32px] text-white">Visitas diarias a nuestra <br /> plataformas</p>
                </div>
            </div>
            <Image className=" relative top-[-300px] w-[734px] h-[491px]" src={"/mapa.png"} width={1000} height={491} alt="" />
        </div>

    )
}
export default Information