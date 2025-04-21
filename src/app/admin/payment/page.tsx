"use client";

import Payments from "@/components/admin/payment/Payments";
import { ROUTE_SIGN_IN } from "@/helpers/routes";
import { redirect } from "next/navigation";

function checkUserIsAuhtenticated(): boolean {
  return true;
}

const PaymentPage = () => {
  if (checkUserIsAuhtenticated()) {
    return (
      <section className={`w-full `}>
        <Payments />
      </section>
    );
  } else {
    return redirect(ROUTE_SIGN_IN);
  }
};

export default PaymentPage;
