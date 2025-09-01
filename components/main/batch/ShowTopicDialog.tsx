"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { topicSchema, TTopicForm } from "@/schemas/topic-schema";
import { SmartSelect } from "@/components/ui/multi-select";
import { FileUpload } from "@/components/ui/handle-file";
import { useState } from "react";
import { PlanTopic } from "@/types/type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddTopic: (topic: PlanTopic) => void;
}

export default function ShowTopicDialog({
  isOpen,
  onClose,
  onAddTopic,
}: Props) {
  const form = useForm<TTopicForm>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      topicTitle: "",
      topicDescription: "",
      topicDuration: "days",
      topicDurationValue: 1,
    },
  });

  // 🔹 keep resources in state
  const [resources, setResources] = useState<File[]>([]);

  const onSubmit = (values: TTopicForm) => {
    const mappedResources = resources.map((f) => ({
      id: nanoid(),
      name: f.name,
      size: f.size,
      type: f.type,
    }));

    const newTopic = {
      topicId: nanoid(),
      topicTitle: values.topicTitle,
      topicDescription: values.topicDescription,
      topicDurationValue: Number(values.topicDurationValue),
      topicDuration: values.topicDuration,
      topicResources: mappedResources,
    };

    console.log("✅ Adding Topic:", newTopic);

    onAddTopic(newTopic);

    form.reset();
    setResources([]); // clear uploaded files
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full md:min-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="topic-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="topicTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter topic name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="topicDurationValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (value)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topicDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (unit)</FormLabel>
                    <FormControl>
                      <SmartSelect
                        options={[
                          { value: "days", label: "Days" },
                          { value: "weeks", label: "Weeks" },
                          { value: "months", label: "Months" },
                        ]}
                        value={field.value}
                        onChange={(val) => field.onChange(val)}
                        placeholder="Select duration"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="topicDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FileUpload onFiles={setResources} />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="topic-form" type="submit">
            Add Topic
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
