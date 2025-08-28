import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Batch } from "@/types/type";
import { timeAgo } from "@/utils/timeAgo";
import { Trash2 } from "lucide-react";
import BatchTable from "./BatchTable"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ShowCardProps = {
  batch: Batch;
};

export default function ShowCards({ batch }: ShowCardProps) {
  const [open, setOpen] = useState(false);

  const deleteCard = () => {
    console.log("Delete card with ID:", batch.batchId);
    const fullBatches = localStorage.getItem("batches");

    if (fullBatches) {
      const parsedBatches: Batch[] = JSON.parse(fullBatches);
      const updatedBatches = parsedBatches.filter(
        (b) => b.batchId !== batch.batchId
      );
      localStorage.setItem("batches", JSON.stringify(updatedBatches));
      window.location.reload();
    }
  };

  return (
    <div>
      {/* Card */}
      <Card
        className="w-full cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center justify-between">
          <CardContent>
            <h1 className="text-xl font-bold font-sans text-gray-900">
              {batch.batchTitle}
            </h1>
            <p className="text-sm text-gray-400">{timeAgo(batch.uploadDate!)}</p>
          </CardContent>
          <div
            className="pr-4"
            onClick={(e) => {
              e.stopPropagation();
              deleteCard();
            }}
          >
            <Trash2 />
          </div>
        </div>
      </Card>

      {/* Dialog for table */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {batch.batchTitle} - Details
            </DialogTitle>
          </DialogHeader>
          <BatchTable batch={batch} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
