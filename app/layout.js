import "@/app/_styles/globals.css";

// Font optimization
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap", // First display default font, once underline font download then swap it
});

// Metadata of HTML file
export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: `%s | The Wild Oasis`,
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious,located in the heart of kashmir, surrounded by beautiful mountains and dark forest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} min-h-screen text-primary-100 bg-primary-950 flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
