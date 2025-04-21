"use client";

import Tariffs from "@/components/admin/tariffs/Tariffs";
import { ROUTE_SIGN_IN } from "@/helpers/routes";
import { redirect } from "next/navigation";

function checkUserIsAuhtenticated(): boolean {
  return true;
}

const TariffsPage = () => {
  if (checkUserIsAuhtenticated()) {
    return (
      <section className={`w-full `}>
        <Tariffs />
      </section>
    );
  } else {
    return redirect(ROUTE_SIGN_IN);
  }
};

export default TariffsPage;
