"use client";

import { MotionButton } from "../ui/Button";
import { TxtButton } from "../ui/TxtButton";

export default function NavBar({}) {
  function teste() {
    console.log("teste");
  }
  return (
    <div className="w-full h-fit flex justify-between p-10">
      <div className="flex">
        <TxtButton func={teste} label="HOME" type="button" />
      </div>
      <div className="flex">
        <MotionButton func={teste} label="CONNECT WALLET" type="button" />
      </div>
    </div>
  );
}
