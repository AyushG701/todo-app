import { configureStore } from "@reduxjs/toolkit";
import { createTransform } from "redux-persist";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoReducer from "./todo-slice";

const todosListTransform = createTransform(
  (inboundState) => {
    const { dragIndex, hoverIndex, dragItem } = inboundState;
    return [dragItem, ...dragIndex, ...hoverIndex];
  },
  (outboundState) => {
    const dragIndex = outboundState
      .filter((item) => typeof item === "number") // dragIndex
      .slice(0, 2);
    const hoverIndex = outboundState
      .filter((item) => typeof item === "number") // hoverIndex
      .slice(2);
    const dragItem = outboundState.find((item) => typeof item === "object"); // dragItem
    return { dragIndex, hoverIndex, dragItem };
  },
  { whitelist: ["todos"] }
);

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [todosListTransform],
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = configureStore({
  reducer: { todos: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
