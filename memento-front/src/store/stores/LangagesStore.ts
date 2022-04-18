import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LanguagesController } from "../../controllers/LanguagesController";
import { Language } from "../../types/Language";

export interface LanguagesState {
    languages: Language[];
    status: "idle" | "loading" | "failed";
}

const initialState: LanguagesState = {
    languages: [],
    status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loadLanguages = createAsyncThunk(
    "languages/load",
    async () => {
        return LanguagesController.getAllLanguages();
    }
);

export const languageSlice = createSlice({
    name: "languages",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // set: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(loadLanguages.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadLanguages.fulfilled, (state, action) => {
                state.status = "idle";
                state.languages = action.payload;
            });
    },
});

// export const {  } = languageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLanguages = (state: RootState) => state.languages.languages;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//     dispatch,
//     getState
// ) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//     }
// };

export default languageSlice.reducer;
