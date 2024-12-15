"use client";

import NavBar from "@/components/NavBar/NavBar";
import { MotionButton } from "@/components/ui/Button";
import { useAuth } from "../providers/AuthContenxt";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const { isLoggedIn, login, logout, account, signer } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/programs");
    }
  });

  function teste() {}
  return (
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
  );
}
