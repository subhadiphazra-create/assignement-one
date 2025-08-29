"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function BatchDetails() {
  const { batchId } = useParams();
  const router = useRouter();

  return (
    <div>
      <div className="flex w-fit items-center justify-start gap-3 cursor-pointer " onClick={() => router.back()}>
        <ArrowLeft width={20} height={20}/> <p className="text-xl font-medium">Back</p>
      </div>
      <h1 className="text-2xl font-bold">Batch Details</h1>
      <p>Currently viewing batch: {batchId}</p>
      {/* 👉 You can fetch details from Redux or API */}
    </div>
  );
}
