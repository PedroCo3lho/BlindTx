"use client";

import { TxtButton } from "../ui/TxtButton";
import Web3EduBrasilLogo from "../../../public/images/Web3EduBrasil_logo.png";

export default function NavBar({}) {
  function teste() {
    console.log("teste");
  }
  return (
    <div className="w-fit flex justify-center px-6 py-4 ">
      <TxtButton
        func={teste}
        label="Web3EduBrasil"
        className="font-bold text-3xl"
        type="button"
        Icon={Web3EduBrasilLogo}
      />
    </div>
  );
}
