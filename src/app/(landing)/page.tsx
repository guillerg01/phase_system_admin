"use client";
import Information from "@/components/LandingPage/Content/Information";
import Operations from "@/components/LandingPage/Content/Operations";
import Services from "@/components/LandingPage/Content/Services";
import { Welcome } from "@/components/LandingPage/Content/Welcome";
import Footer from "@/components/LandingPage/Footer/Footer";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { GRADIENT } from "@/constants/styles";

const OPETATION_AND_SERVICES_IMAGE = `bg-[url('/landingpage/vecteezy_ev-charging-station-for-future-electric-cars-in-the-concept.svg')] bg-cover`;
const INFORMATION_AND_FOOTER_IMAGE = `bg-[url('/landingpage/phone-services.png')] bg-cover`;

export default function Home() {
  return (
    <div className="w-[80wv] h-full flex flex-col">
      <Welcome />
      <div className={`w-[80wv]  h-[1747px] ${OPETATION_AND_SERVICES_IMAGE}`}>
        <Operations />
        <Services />
      </div>
      <div className={`w-[80wv]  ${INFORMATION_AND_FOOTER_IMAGE}`}>
        <Information />
        <Footer />
      </div>
      <LoginModal />
      <RegisterModal />
    </div>
  );
}
