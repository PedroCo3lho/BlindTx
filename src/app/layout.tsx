import { Lexend_Deca } from "next/font/google";

import "./globals.css";
import { Metadata } from "next";
import { AuthProvider } from "../providers/AuthContenxt";
import NavBar from "@/components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Certifier",
  description: "Web3EduBrasil Certifier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${LexendDeca.className} bg-white flex flex-col justify-start items-center border text-black border-black h-screen`}
        >
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <NavBar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
