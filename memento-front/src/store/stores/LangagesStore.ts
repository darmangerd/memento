import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { APILanguages } from "../../api/APILanguages";
import { Language } from "../../types/Language";

export interface LanguagesState {
    languages: Language[];
    status: "idle" | "loading" | "failed";
}

const initialState: LanguagesState = {
    languages: [],
    status: "idle",
};

export const loadLanguages = createAsyncThunk(
    "languages/load",
    async () => {
        return APILanguages.getAllLanguages();
    }
);

export const languageSlice = createSlice({
    name: "languages",
    initialState,
    reducers: {
    },
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

export const selectLanguages = (state: RootState) => state.languages.languages;

export default languageSlice.reducer;
