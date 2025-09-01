"use client";

import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ShowTopicDialog from "./ShowTopicDialog";
import { PlanTopic, TrainingPlan } from "@/types/type";
import { addPlan } from "@/store/plansSlice";
import { planSchema, TPlanForm } from "@/schemas/plan-schema";
import { store } from "@/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPlanDialog({ isOpen, onClose }: Props) {
  const dispatch = useDispatch();
  const [topics, setTopics] = useState<PlanTopic[]>([]);
  const [showTopicDialog, setShowTopicDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const form = useForm<TPlanForm>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      planTitle: "",
      planStartDate: new Date().toISOString().split("T")[0],
    },
  });

  const onAddTopic = (topic: PlanTopic) =>
    setTopics((prev) => [...prev, topic]);

  const onRemoveTopic = (topicId: string) => {
    setTopics((prev) => prev.filter((t) => t.topicId !== topicId));
  };

  // 🧮 Calculate total duration
  const totalDuration = useMemo(() => {
    let totalDays = 0;
    topics.forEach((t) => {
      if (t.topicDuration === "days") totalDays += t.topicDurationValue;
      if (t.topicDuration === "weeks") totalDays += t.topicDurationValue * 7;
      if (t.topicDuration === "months") totalDays += t.topicDurationValue * 30;
    });
    return totalDays;
  }, [topics]);

  const onSubmit = (values: TPlanForm) => {
    if (topics.length === 0) {
      setShowErrorDialog(true);
      return;
    }

    const plan: TrainingPlan = {
      planId: nanoid(),
      planTitle: values.planTitle,
      planStartDate: values.planStartDate,
      planTopics: topics,
      createdAt: new Date().toISOString(),
    };

    // 🟢 Debug logs
    console.log("✅ Creating Plan:", plan);
    console.log("✅ Dispatching Action:", addPlan(plan));

    dispatch(addPlan(plan));
    console.log("📦 Store after saving plan:", store.getState().plans);

    // After dispatch, check store content
    setTimeout(() => {
      console.log(
        "📦 Updated Store (plans):",
        (window as any).store?.getState()?.plans
      );
    }, 200);

    form.reset();
    setTopics([]);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full md:min-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Training Plan</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              id="plan-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="planTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter plan title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="planStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowTopicDialog(true)}
              >
                Add Topic
              </Button>

              <div>
                <h3 className="font-semibold mt-4 mb-2">Topics</h3>
                {topics.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No topics added yet.
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Topic Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topics.map((t) => (
                        <TableRow key={t.topicId}>
                          <TableCell>{t.topicTitle}</TableCell>
                          <TableCell>{t.topicDescription}</TableCell>
                          <TableCell>
                            {t.topicDurationValue} {t.topicDuration}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => onRemoveTopic(t.topicId)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={2} className="font-semibold">
                          Total Duration
                        </TableCell>
                        <TableCell colSpan={2}>{totalDuration} days</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </div>
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="plan-form" type="submit">
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nested Topic Dialog */}
      {showTopicDialog && (
        <ShowTopicDialog
          isOpen={showTopicDialog}
          onClose={() => setShowTopicDialog(false)}
          onAddTopic={onAddTopic} // pass the function directly
        />
      )}

      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Validation Error</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Please add at least one topic before creating the plan.
          </p>
          <DialogFooter>
            <Button onClick={() => setShowErrorDialog(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
