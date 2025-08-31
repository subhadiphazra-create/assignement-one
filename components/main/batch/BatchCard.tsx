"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleSmall,
  Percent,
  SendHorizonal,
  UserCheck,
  UserRoundCheck,
} from "lucide-react";
import { mockEmployees } from "@/constants";
import { Batch } from "@/types/type";

interface BatchCardProps {
  batch: Batch;
}

export default function BatchCard({ batch }: BatchCardProps) {
  const checkIsComplete = (endDate: string) => {
    return new Date() > new Date(endDate);
  };

  const findNameById = (id: string) => {
    const trainee = mockEmployees.find((e) => e.userId === id);
    return trainee
      ? trainee.basicData.firstName +
          " " +
          trainee.basicData.middleName +
          " " +
          trainee.basicData.lastName
      : "Unknown";
  };

  return (
    <Card className="w-full md:max-w-md mt-5">
      <CardHeader>
        <CardTitle className="border-b pb-5 flex justify-between">
          <h2 className="text-md font-semibold flex items-center gap-3">
            <SendHorizonal width={16} height={16} /> {batch.batchTitle}
          </h2>
          <p className="text-md font-semibold flex items-center gap-3">
            {!checkIsComplete(batch.batchEndDate) && (
              <CircleSmall
                width={16}
                height={16}
                color="green"
                className="animate-ping"
              />
            )}
            {checkIsComplete(batch.batchEndDate) ? "Completed" : "Active"}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Trainees */}
        <div>
          <h1 className="font-bold text-xl">Trainees</h1>
          {batch.batchTrainee.map((trainee, key) => (
            <div key={key}>
              <p className="text-md font-semibold flex items-center gap-3 my-4">
                <UserRoundCheck width={18} height={18} />
                {findNameById(trainee)}
              </p>
              <hr />
              <p className="text-md font-semibold flex items-center gap-3 my-4">
                <Percent width={16} height={16} />
                Assignment Marks: <span className="font-extralight">n/a</span>
              </p>
              <hr />
            </div>
          ))}
        </div>

        {/* Batch Seniors */}
        <div>
          <h1 className="font-bold text-xl mt-7">Batch Seniors</h1>

          {[
            { label: "Trainers", members: batch.batchTrainer },
            { label: "Mentors", members: batch.batchMentor },
            { label: "Reviewers", members: batch.batchReviewer },
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className="text-md font-semibold flex items-center gap-3 mt-4 mb-1">
                <UserCheck width={16} height={16} />
                {section.label}:
              </h3>
              <p className="text-sm font-normal">
                {section.members.map((id, key) => (
                  <span key={key}>
                    {findNameById(id)}
                    {key < section.members.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <hr className="my-3"/>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
