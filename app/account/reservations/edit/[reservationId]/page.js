import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { auth } from "@/app/_lib/auth";
import { getBooking, getSettings } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  // CHANGE
  const { reservationId } = params;

  const { numGuests, observations, id } = await getBooking(reservationId);
  const { maxBookingLength } = await getSettings();
  const session = await auth();

  if (!id) {
    notFound();
  }

  const cabin = {
    numGuests,
    observations,
    bookingId: id,
    maxCapacity: maxBookingLength,
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservationForm cabin={cabin} user={session.user} />
    </div>
  );
}
