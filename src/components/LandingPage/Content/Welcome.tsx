const PRIMARY_BACKGORUND_IMAGE = `bg-[url('/landingpage/welcome/woman-charging-her-electric-car-with-charging-pistol.svg')] bg-cover`;
const SECONDARY_BACKGORUND_IMAGE = `bg-[url('/landingpage/welcome/electric-car-and-charger-station.svg')] bg-cover`;

export const Welcome = () => {
  return (
    <div className={`w-[80vw] h-[1276px] ${PRIMARY_BACKGORUND_IMAGE} flex flex-col items-center justify-between border-b-2 border-gray-500`}>
      <h1 className="flex text-6xl text-white pt-20 text-center relative top-47 "><strong>Bienvenido a nuestra <br />plataforma de <br />Electromovilidad</strong></h1>
      <p className="flex text-xl text-white text-center relative top-20 ">Descubre los servicios que ofrecemos para una <br />transportación sostenible.</p>
      <div className={`w-[80vw] h-[720px] ${SECONDARY_BACKGORUND_IMAGE} `}/>
    </div>
  )
}
