import {useAppDispatch, useAppSelector} from "../store/hooks";
import {
    loadSession as loadSessionStore,
    selectUser,
    signIn as signInStore,
    signOut as signOutStore
} from "../store/stores/UserStore";
import {Token} from "../types/Token";
import {APIUser} from "../api/APIUser";
import {useCallback} from "react";
import {useAutomaticFetch} from "./useAutomaticFetch";
import {UserProfile} from "../types/UserProfile";
import {useNavigate} from "react-router-dom";

export function useUser() {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const signOut = async () => {
        // navigate("/sign-in?message=You have been logged out", {replace: true});
        await APIUser.signOut(user.token);
        dispatch(signOutStore());
    };

    const saveToken = (token: Token) => {
        dispatch(signInStore(token));
    };

    const signIn = async (email: string, password: string) => {
        const token = await APIUser.signIn(email, password);
        saveToken(token);
    };

    const loadSession = () => {
        dispatch(loadSessionStore());
    };

    const getUserProfile = useCallback(() => APIUser.getUser(user.token), [user.token]);
    const [isLoadingUser, userProfile] = useAutomaticFetch<UserProfile>(getUserProfile, undefined, signOut);

    return {user, signOut, signIn, loadSession, isLoadingUser, userProfile};
}
