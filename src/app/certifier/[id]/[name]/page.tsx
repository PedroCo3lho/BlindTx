"use client";

import { Certifier } from "@/components/CertifierPage/Certifier";
import { useParams } from "next/navigation";

export default function CertifierPage() {
  const { id, name } = useParams();

  return <Certifier programId={id} programName={name} />;
}
