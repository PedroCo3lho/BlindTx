"use client";

import { useAuth } from "@/providers/AuthContenxt";
import { useEffect, useState } from "react";
import { MotionDiv } from "../ui/MotionDiv";
import { MotionButton } from "../ui/Button";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/Textarea";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";

export const Certifier = ({
  programId,
  programName,
}: {
  programId: any;
  programName: any;
}) => {
  const {
    isLoggedIn,
    login,
    logout,
    account,
    signer,
    signature,
    generateIpfsHash,
    mintCertificate,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDesc] = useState("");
  const [hours, setHours] = useState(0);
  const [metadata, setMetadata] = useState("");
  const [ipfsImage, setIpfsImage] = useState("");
  const [requestsList, setRequests] = useState([]);

  async function fetchProgramUsers() {
    try {
      const response = await fetch(`/api/user?programId=${programId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      setRequests(data.users);
      setHours(data.hours);
      setIpfsImage(data.ipfsImage);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  const handleRequestClick = (request: any) => {
    setEmail(request.email);
    setAddress(request.address);
    setUsername(request.name);

    setDesc(
      `This certificate is awarded to ${
        request.name
      } in recognition of successfully completing the ${decodeURIComponent(
        programName
      )} learning track, totaling a workload of ${hours} hours.`
    );
  };

  useEffect(() => {
    if (requestsList.length === 0) {
      fetchProgramUsers();
    }
  });

  async function fetchMetadata() {
    const res = await generateIpfsHash(ipfsImage, description);
    setMetadata(res);
  }

  async function handleMint() {
    mintCertificate(address, metadata, programId);
  }

  function testef() {}
  return (
    <div className="w-full h-full flex px-10 py-5 gap-10 overflow-hidden justify-center ">
      <div className="w-2/4 h-full bg-[#F8F6F6] drop-shadow-2xl rounded-2xl flex flex-col items-end py-12 gap-4 overflow-hidden px-6">
        <p className="text-2xl font-bold w-full text-center">
          {decodeURIComponent(programName)} Certificate
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
              setContent={setAddress}
              placeholder="0x1D1479..."
              value={address}
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="pl-2 font-bold text-lg">Description</p>
            <TextArea
              setContent={setDesc}
              placeholder="Description..."
              className="h-32"
              value={description}
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="pl-2 font-bold text-lg">Metadata</p>
            <TextArea
              setContent={setMetadata}
              placeholder="Metadata..."
              className="h-32"
              value={metadata}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <MotionButton
            func={() =>
              toast.promise(fetchMetadata(), {
                pending: "Generating...",
                success: "Metadata generated!",
                error: "Error.",
              })
            }
            label="Generate Metadata"
            type="button"
            className="bg-green border-none text-black"
          />
          <MotionButton
            func={() => handleMint()}
            label="Send"
            Icon={IoSend}
            rightIcon={true}
            type="button"
            className="bg-green border-none text-black"
          />
        </div>
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
          <div className="w-full h-full flex flex-col gap-2 px-5 py-2 overflow-y-auto">
            {requestsList.length !== 0 ? (
              requestsList.map((e: any, index: any) => {
                return (
                  <MotionDiv
                    key={index}
                    className={`w-full h-20 rounded-lg flex gap-4 outline-none items-center justify-between bg-ccgray rounded-box shadow-lg px-6 text-neutral font-bold cursor-pointer transition-[border] duration-1000 ${
                      e.minted === true ? "border border-green" : ""
                    }`}
                    func={() => handleRequestClick(e)}
                  >
                    {e.name}
                    {e.minted ? <p className="text-green">Minted</p> : <></>}
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
