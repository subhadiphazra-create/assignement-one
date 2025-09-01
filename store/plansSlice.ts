import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import type { TrainingPlan, PlanTopic } from "@/types/type";

interface PlansState {
  plans: TrainingPlan[];
}

const initialState: PlansState = {
  plans: [],
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addPlan: {
      reducer(state, action: PayloadAction<TrainingPlan>) {
        console.log("🔥 addPlan reducer hit:", action.payload);
        state.plans.push(action.payload);
      },
      prepare(
        payload: Omit<TrainingPlan, "planId" | "createdAt"> & {
          planId?: string;
        }
      ) {
        const id = payload.planId ?? nanoid();
        return {
          payload: {
            ...payload,
            planId: id,
            createdAt: new Date().toISOString(),
          } as TrainingPlan,
        };
      },
    },

    removePlan(state, action: PayloadAction<{ planId: string }>) {
      state.plans = state.plans.filter(
        (p) => p.planId !== action.payload.planId
      );
    },
    addTopicToPlan(
      state,
      action: PayloadAction<{ planId: string; topic: PlanTopic }>
    ) {
      const plan = state.plans.find((p) => p.planId === action.payload.planId);
      if (plan) {
        plan.planTopics.push(action.payload.topic);
      }
    },
    removeTopicFromPlan(
      state,
      action: PayloadAction<{ planId: string; topicId: string }>
    ) {
      const plan = state.plans.find((p) => p.planId === action.payload.planId);
      if (plan) {
        plan.planTopics = plan.planTopics.filter(
          (t) => t.topicId !== action.payload.topicId
        );
      }
    },
  },
});

export const { addPlan, removePlan, addTopicToPlan, removeTopicFromPlan } =
  plansSlice.actions;
export default plansSlice.reducer;
