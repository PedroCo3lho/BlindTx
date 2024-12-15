"use client";

import { Certifier } from "@/components/CertifierPage/Certifier";
import { useParams } from "next/navigation";

export default function certifierPage() {
  const { id, name } = useParams();

  return <Certifier programId={id} programName={name} />;
}
