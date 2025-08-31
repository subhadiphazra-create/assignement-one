// store/eventsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "@/components/calendar/interfaces";

interface EventsState {
  events: IEvent[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<IEvent>) => {
      state.events = state.events.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    },

    // removeEvent: (state, action: PayloadAction<string>) => {
    //   state.events = state.events.filter((e) => e.id !== action.payload);
    // },
  },
});

export const { addEvent, updateEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
