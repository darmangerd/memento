import {useEffect} from "react";
import {useAppSelector} from "../store/hooks";
import {selectUser} from "../store/stores/UserStore";
import {useNavigate} from "react-router-dom";

export function useLoggedGuard(accessOnlyWhenNotLogged = false) {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (accessOnlyWhenNotLogged) {
            if (user.token) {
                navigate("/", {replace: true});
            }
        } else {
            if (!user.token) {
                navigate("/sign-in?error=You have to create an account to access this page", {replace: true});
            }
        }

    }, [user]);
}
