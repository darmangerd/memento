import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages";
import ListCreate from "./pages/list/list-create";
import {useAppDispatch} from "./store/hooks";
import {loadLanguages} from "./store/stores/LangagesStore";
import ListView from "./pages/list/[id]";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import {useUser} from "./hooks/useUser";

function App() {
    const dispatch = useAppDispatch();
    const {loadSession} = useUser();

    useEffect(() => {
        loadSession();
        dispatch(loadLanguages());
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/list/create" element={<ListCreate />} />
                <Route path="/list/:id" element={<ListView />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
        </div>
    );
}

export default App;
