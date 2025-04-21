import Image from "next/image"

const SCHEME_IMAGE = `bg-[url('/landingpage/operation/operations.png')] bg-cover`;

const Operations = () => {
    return (
        <div className="w-[80vw] grid justify-around  h-[731px] 
          bg-[#ababab80]
         rounded-[0px_0px_115px_0px] backdrop-blur-[10.35px] backdrop-brightness-[100%] 
         ">
            <div className="flex flex-rows items-center ">
                <div>
                    <div className="w-[324px] h-[275px] m-2">
                        <p className="text-right text-white">Monitoreo <br /><br />
                            Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.<br />
                            Sed do eiusmod tempor <br />incididunt ut labore et dolore <br />magna aliqua.
                        </p>
                    </div>
                    <div className="w-[324px] h-[275px] m-2  ">
                        <p className="text-right text-white">Ubicacion <br /><br />
                            Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.<br />
                            Sed do eiusmod tempor <br />incididunt ut labore et dolore <br />magna aliqua.</p>
                    </div>
                </div>
                <div className={` w-[650px] h-[650px] ${SCHEME_IMAGE} m-5;`} />
                <div>
                    <div className="w-[324px] h-[275px] ">
                        <p className="text-left text-white m-2 ">Vehículos <br /><br />
                            Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.<br />
                            Sed do eiusmod tempor <br />incididunt ut labore et dolore <br />magna aliqua.</p>
                    </div>
                    <div className=" w-[324px] h-[275px] m-2 ">
                        <p className="text-left text-white">Cargadores <br /><br />
                            Lorem ipsum dolor sit amet,<br /> consectetur adipiscing elit.<br />
                            Sed do eiusmod tempor <br />incididunt ut labore et dolore <br />magna aliqua.</p>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Operations