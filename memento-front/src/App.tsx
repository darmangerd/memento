import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages";
import ListCreate from "./pages/list/list-create";
import { useAppDispatch } from "./store/hooks";
import { loadLanguages } from "./store/stores/LangagesStore";
import ListView from "./pages/list/[id]";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadLanguages());
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/list/create" element={<ListCreate />} />
                <Route path="/list/:id" element={<ListView />} />
            </Routes>
        </div>
    );
}

export default App;
