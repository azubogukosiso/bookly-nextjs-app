import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AuthProvider from "@/app/(components)/AuthProvider";
import ToasterContext from "@/app/(components)/ToasterContext";
import { CartContextProvider } from "@/app/context/CartContext";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/(components)/Navbar";
import Footer from "@/app/(components)/Footer";

const pacifico = localFont({
  src: "./fonts/Pacifico.ttf",
  variable: "--font-pacifico",
  weight: "100 900",
});
const inter = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata = {
  title: "Bookly",
  description: "The Most Trusted Repository of Best Sellers",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <AuthProvider>
        <CartContextProvider session={session}>
          <body
            className={`${inter.variable} ${pacifico.variable} antialiased grid grid-rows-[auto_1fr_auto] min-h-screen p-5 bg-white text-black`}
          >
            <ToasterContext />
            <Navbar session={session} />
            {children}
            <Footer />
          </body>
        </CartContextProvider>
      </AuthProvider>
    </html>
  );
}
