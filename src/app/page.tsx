"use client";

import NavBar from "@/components/NavBar/NavBar";
import { MotionButton } from "@/components/ui/Button";
import { useAuth } from "../providers/AuthContenxt";
import { useEffect } from "react";
import Web3EduBrasilLogo from "../../public/images/Web3EduBrasil_logo.png";
import { Island_Moments } from "next/font/google";
import { CertifierPage } from "@/components/CertifierPage/CertifierPage";

export default function Page() {
  const { isLoggedIn, login, logout, account, signer } = useAuth();

  useEffect(() => {
    console.log(account);
  }, [account]);

  function teste() {}
  return (
    <>
      {isLoggedIn ? (
        <>
          <CertifierPage />
        </>
      ) : (
        <>
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center py-10 px-20 w-fit h-fit gap-6 bg-[#F8F6F6] drop-shadow-2xl rounded-2xl ">
              <p className="text-3xl font-bold">Certifier</p>
              <MotionButton
                label="Connect Wallet"
                func={login}
                type="button"
                className="text-black"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
