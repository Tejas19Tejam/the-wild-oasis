"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "../_lib/auth";
import { supabase } from "./supabase";
import { RedirectType, redirect } from "next/navigation";

export async function loginAction() {
  return await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  return await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData) {
  //  Try every server action as unsafe, meaning validate before doing any action
  const session = await auth();

  if (!session) throw new Error("Please login before doing this action");

  const nationalID = formData.get("nationalID");
  const [countryName, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid nationalID");
  }

  const { data, error } = await supabase
    .from("guests")
    .update({
      nationality: countryName,
      countryFlag: countryFlag,
      nationalID: nationalID,
    })
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  // Use to re-validate the data on demand
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

// export async function updateBooking(id, updatedFields) {
export async function updateBooking(id, formData) {
  // formData.entries : return an array with key-value pair
  // Object.fromEntries : return an object by combining kay-value pair object of an array
  const updatedFields = Object.fromEntries(formData.entries());
  const session = await auth();

  if (!session) throw new Error("You are not authorize to perform this action");

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .eq("guestId", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${id}`);
  redirect("/account/reservations", RedirectType.replace);
}

export async function createBooking(newBooking) {
  // 1 ) Check user is authenticated
  const session = await auth();
  if (!session)
    throw new Error(
      "You are not authenticated to perform this action, pleas login"
    );

  // Create new booking

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .eq("guestId", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${newBooking.cabinId}`);
  redirect("/account/reservations", RedirectType.replace);
}
