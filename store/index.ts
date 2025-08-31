import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import trainingReducer from "./trainingSlice";
import themeReducer from "./themeSlice";
import eventsReducer from "./eventsSlice"; // ✅ add this
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  training: trainingReducer,
  theme: themeReducer,
  events: eventsReducer, // ✅ persist events too
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "training", "events"], // ✅ add events here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
