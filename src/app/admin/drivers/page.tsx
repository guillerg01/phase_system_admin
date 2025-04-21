"use client";

import Drivers from "@/components/admin/drivers/Drivers";
import { ROUTE_SIGN_IN } from "@/helpers/routes";
import { redirect } from "next/navigation";

function checkUserIsAuhtenticated(): boolean {
  return true;
}

const DriversPage = () => {
  if (checkUserIsAuhtenticated()) {
    return (
      <section className={`w-full `}>
        <Drivers />
      </section>
    );
  } else {
    return redirect(ROUTE_SIGN_IN);
  }
};

export default DriversPage;
