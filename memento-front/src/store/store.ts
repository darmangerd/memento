import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import LangagesStore from "./stores/LangagesStore";
import UserStore from "./stores/UserStore";

export const store = configureStore({
  reducer: {
    languages: LangagesStore,
    user: UserStore
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
