import { useAuth } from "@/providers/AuthContenxt";
import { useEffect, useState } from "react";
import { MotionDiv } from "../ui/MotionDiv";
import { MotionButton } from "../ui/Button";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/Textarea";
import { IoSend } from "react-icons/io5";

export const CertifierPage = () => {
  const { isLoggedIn, login, logout, account, signer, signature } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDesc] = useState("");

  const teste = [
    "teste",
    "teste",
    "teste",
    "teste",
    "teste",
    "teste",
    "teste",
    "teste",
  ];
  function testef() {}
  return (
    <div className="w-full h-full flex px-10 py-5 gap-10 overflow-hidden justify-center ">
      <div className="w-2/4 h-full bg-[#F8F6F6] drop-shadow-2xl rounded-2xl flex flex-col items-end py-12 gap-4 overflow-hidden px-6">
        <p className="text-2xl font-bold w-full text-center">
          Web3 Introduction Certificate
        </p>
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <p className="pl-2 font-bold text-lg">Username</p>
            <Input
              setContent={setUsername}
              placeholder="Joe B."
              value={username}
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="pl-2 font-bold text-lg">Email</p>
            <Input
              setContent={setEmail}
              placeholder="user@example.com"
              value={email}
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="pl-2 font-bold text-lg">Address</p>
            <Input
              setContent={setUsername}
              placeholder="0x1D1479..."
              value={username}
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="pl-2 font-bold text-lg">Description</p>
            <TextArea
              setContent={setDesc}
              placeholder="Description..."
              className="h-44"
              value={description}
            />
          </div>
        </div>
        <MotionButton
          func={testef}
          label="Send"
          Icon={IoSend}
          rightIcon={true}
          type="button"
          className="bg-green border-none text-black"
        />
      </div>
      <div className="min-w-96 h-full flex flex-col gap-4 ">
        <MotionButton
          func={testef}
          label="New Certificate (Manual)"
          className="w-full bg-green border-none shadow-xl text-black font-bold py-3"
          type="button"
        />
        <div className="w-full flex-grow bg-[#F8F6F6] drop-shadow-2xl rounded-2xl flex flex-col items-center py-6 gap-4 overflow-hidden">
          <p className="text-2xl font-bold h-fit">Certificate requests</p>
          <div className="w-full flex flex-wrap gap-2 px-5 overflow-y-auto">
            {teste.length !== 0 ? (
              teste.map((e: any, index: any) => {
                return (
                  <MotionDiv
                    key={index}
                    className="w-full h-20 rounded-lg flex gap-4 outline-none items-center justify-between bg-ccgray rounded-box shadow-lg px-6 text-neutral font-bold cursor-pointer transition-[border] duration-1000"
                  >
                    a
                  </MotionDiv>
                );
              })
            ) : (
              <div className="w-full min-h-full flex items-center justify-center">
                <p className="text-3xl text-gray/80 font-bold">
                  No requests found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
