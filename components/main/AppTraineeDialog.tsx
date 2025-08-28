"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBatch } from "@/store/trainingSlice";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";

import { Batch, Employees } from "@/types/type";

type Props = {
  employees: Employees;
};

export default function AppTraineeDialog({ employees }: Props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // ✅ Match Batch interface (omit batchId, it’s auto-generated)
  const [form, setForm] = useState<Omit<Batch, "batchId">>({
    batchTitle: "",
    batchStatus: "planned",
    batchRegion: "",
    batchStartDate: "",
    batchEndDate: "",
    batchMentor: [],
    batchReviewer: [],
    batchTrainer: [],
    batchTrainee: [],
    companyId: "",
    courseDescription: "",
    uploadDate: "",
  });

  const handleSubmit = () => {
    const newBatch: Batch = {
      batchId: uuidv4(),
      ...form,
      uploadDate: new Date().toISOString(),
    };
    dispatch(addBatch(newBatch));
    setOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Batch</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Training Batch</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Batch Title */}
          <div>
            <Label>Batch Title</Label>
            <Input
              value={form.batchTitle}
              onChange={(e) => setForm({ ...form, batchTitle: e.target.value })}
              placeholder="Enter batch title"
            />
          </div>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Select
              value={form.batchStatus}
              onValueChange={(val) => setForm({ ...form, batchStatus: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Region */}
          <div>
            <Label>Region</Label>
            <Input
              value={form.batchRegion}
              onChange={(e) =>
                setForm({ ...form, batchRegion: e.target.value })
              }
              placeholder="Enter region"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={form.batchStartDate}
                onChange={(e) =>
                  setForm({ ...form, batchStartDate: e.target.value })
                }
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={form.batchEndDate}
                onChange={(e) =>
                  setForm({ ...form, batchEndDate: e.target.value })
                }
              />
            </div>
          </div>

          {/* Mentors */}
          {/* Mentors */}
          <div>
            <Label>Mentors</Label>
            <MultiSelect
              options={employees.map((e) => ({
                value: `${e.basicData.firstName} ${e.basicData.lastName}`,
                label: `${e.basicData.firstName} ${e.basicData.lastName}`,
                role: e.basicData.role,
              }))}
              value={form.batchMentor}
              onChange={(val) => setForm({ ...form, batchMentor: val })}
            />
          </div>

          {/* Reviewers */}
          <div>
            <Label>Reviewers</Label>
            <MultiSelect
              options={employees.map((e) => ({
                value: `${e.basicData.firstName} ${e.basicData.lastName}`,
                label: `${e.basicData.firstName} ${e.basicData.lastName}`,
                role: e.basicData.role,
              }))}
              value={form.batchReviewer}
              onChange={(val) => setForm({ ...form, batchReviewer: val })}
            />
          </div>

          {/* Trainers */}
          <div>
            <Label>Trainers</Label>
            <MultiSelect
              options={employees.map((e) => ({
                value: `${e.basicData.firstName} ${e.basicData.lastName}`,
                label: `${e.basicData.firstName} ${e.basicData.lastName}`,
                role: e.basicData.role,
              }))}
              value={form.batchTrainer}
              onChange={(val) => setForm({ ...form, batchTrainer: val })}
            />
          </div>

          {/* Trainees */}
          <div>
            <Label>Trainees</Label>
            <MultiSelect
              options={employees.map((e) => ({
                value: `${e.basicData.firstName} ${e.basicData.lastName}`,
                label: `${e.basicData.firstName} ${e.basicData.lastName}`,
                role: e.basicData.role,
              }))}
              value={form.batchTrainee}
              onChange={(val) => setForm({ ...form, batchTrainee: val })}
            />
          </div>

          {/* Company ID */}
          <div>
            <Label>Company ID</Label>
            <Input
              value={form.companyId}
              onChange={(e) => setForm({ ...form, companyId: e.target.value })}
              placeholder="Enter company id"
            />
          </div>

          {/* Course Description */}
          <div>
            <Label>Course Description</Label>
            <Textarea
              value={form.courseDescription}
              onChange={(e) =>
                setForm({ ...form, courseDescription: e.target.value })
              }
              placeholder="Enter course description"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
