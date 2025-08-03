import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    console.log(cabin);

    if (!cabin) {
      return Response.json({ message: "Cabins not found" });
    }

    return Response.json({ cabin, bookedDates });
  } catch (err) {
    return Response.json({ message: "Cabin not found" });
  }
}
