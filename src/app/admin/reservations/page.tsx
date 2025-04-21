"use client";


import { ROUTE_SIGN_IN } from "@/helpers/routes";
import { redirect } from "next/navigation";
import Reservations from '@/components/admin/reservations/Reservations';

function checkUserIsAuhtenticated(): boolean {
  return true;
}

const ReservationsPage = () => {
  if (checkUserIsAuhtenticated()) {
    return (
      <section className={`w-full `}>
        <Reservations />
      </section>
    );
  } else {
    return redirect(ROUTE_SIGN_IN);
  }
};

export default ReservationsPage;
