"use client";

import AppHeader from "@/components/main/AppHeader";
import AppSidebar from "@/components/main/AppSidebar";
import ShowCards from "@/components/main/ShowCards";
import { mockEmployees } from "@/constants";
import { Batch } from "@/types/type";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AppTraineeDialog from "@/components/main/AppTraineeDialog";

const Home = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [testBatches, setTestBatches] = useState<Batch[]>();

  useEffect(() => {
    const fetchBatches = () => {
      const data = localStorage.getItem("batches");
      if (data) {
        setTestBatches(JSON.parse(data));
        setIsLoading(false);
      }
    };
    fetchBatches();
  }, []);

  // Filter batches based on search text
  const filteredBatches = testBatches?.filter((batch: Batch) =>
    batch.batchTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <AppHeader />
        <main className="flex-1 p-4 pr-20 flex flex-col w-full gap-4 overflow-x-auto">
          <div className="flex items-center gap-4 w-full">
            <Input
              type="text"
              placeholder="Search batches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 md:w-[75%]"
            />
            <AppTraineeDialog employees={mockEmployees} />
          </div>

          {/* 🗂 Cards */}
          <div className="flex flex-col gap-4 overflow-x-auto scroll-bar-hide">
            {!isLoading && filteredBatches?.length === 0 ? (
              <h1>No Data Found</h1>
            ) : (
              filteredBatches?.map((batch: Batch) => (
                <ShowCards key={batch.batchId} batch={batch} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
