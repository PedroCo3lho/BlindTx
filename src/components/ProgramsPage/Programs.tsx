"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthContenxt";
import { ProgramCard } from "@/components/ProgramsPage/ProgramsCard";

export const Programs = () => {
  const [programsList, setProgramsList] = useState<any>([]);

  const { isLoggedIn, login, logout, account, signer } = useAuth();

  const fetchProgramsList = async () => {
    try {
      const response = await fetch("/api/programs", {
        method: "GET",
      });
      const data = await response.json();
      setProgramsList(data.programs);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (programsList.length <= 0) {
      fetchProgramsList();
    }
  }, [programsList]);

  useEffect(() => {
    console.log(account, isLoggedIn);
  }, [account, isLoggedIn]);

  return (
    <div className="flex w-full h-full justify-start items-start flex-col overflow-y-scroll px-12 mt-4 gap-4">
      <p className="font-bold lg:text-3xl text-2xl text-center text-nowrap md:order-first order-last">
        Programs
      </p>
      {programsList.length !== 0 ? (
        programsList.map((e: any, index: any) => {
          return (
            <ProgramCard
              key={index}
              id={e.id}
              image={e.banner}
              title={e.title}
              description={e.resumedDescription}
            />
          );
        })
      ) : (
        <div className="w-full min-h-full flex items-center justify-center">
          <p className="text-3xl text-gray/80 font-bold">
            No programs found 🤨
          </p>
        </div>
      )}
    </div>
  );
};