import React, {KeyboardEvent, useEffect, useState} from "react";
import {Flex} from "rebass";
import MTitle from "../components/MTitle";
import MInputText from "../components/MInputText";
import MLabel from "../components/MLabel";
import MButton from "../components/MButton";
import {useFetch} from "../hooks/useFetch";
import {APIUser} from "../api/APIUser";
import MDescription from "../components/MDescription";
import {GREEN_COLOR, PRIMARY_COLOR, RED_COLOR} from "../constants/style";
import {Token} from "../types/Token";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectUserToken, signIn as signInStore} from "../store/stores/UserStore";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useLoggedGuard} from "../hooks/useLoggedGuard";
import {MLink} from "../components/MLink";

function SignInPage() {
    useLoggedGuard(true);

    const user = useAppSelector(selectUserToken);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signedIn = (user: Token) => {
        dispatch(signInStore(user));
    };
    const [signIn, isLoading, datas, errors, succeed] = useFetch<Token, "email">(APIUser.signIn, signedIn);

    const confirmSignIn = () => {
        signIn(email, password);
        setSearchParams({});
    };

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            confirmSignIn();
        }
    };

    useEffect(() => {
        console.log(user);
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <Flex flex={1} minHeight="100vh" justifyContent="center" alignItems="center">
            <Flex width={[0.9, 1 / 2, 1 / 3]} py={5} flexDirection="column">
                <Flex width={1} mb={4} flexDirection="column">
                    <MTitle mb={0}>Sign in</MTitle>
                    {searchParams.get("message") &&
                        <MDescription color={GREEN_COLOR}>{searchParams.get("message")}</MDescription>
                    }
                    {searchParams.get("error") &&
                        <MDescription color={RED_COLOR}>{searchParams.get("error")}</MDescription>
                    }
                </Flex>
                <Flex width={1} flexDirection="column">
                    <Flex mb={4} flexDirection="column">
                        <MLabel htmlFor="email">Email</MLabel>
                        <MInputText type="email" id="email" placeholder="Email" value={email}
                                    onChange={({target}) => setEmail(target.value)} success={!!datas}
                                    error={!!errors?.pick("email")} onKeyDown={handleEnter}/>
                    </Flex>
                    <Flex flexDirection="column">
                        <MLabel htmlFor="password">Password</MLabel>
                        <MInputText type="password" id="password" placeholder="Password" value={password}
                                    onChange={({target}) => setPassword(target.value)} success={!!datas}
                                    error={!!errors?.pick("email")} onKeyDown={handleEnter}/>
                    </Flex>
                    <Flex mt={3} justifyContent="center" textAlign="center">
                        {succeed ?
                            <MDescription color={GREEN_COLOR}>Successfully logged in (token
                                = {datas.token})</MDescription>
                            :
                            <MDescription color={RED_COLOR}>{errors?.pick("email")}</MDescription>
                        }
                    </Flex>
                </Flex>
                <Flex mb={2} mt={5} justifyContent="center">
                    <MButton onClick={confirmSignIn} disabled={isLoading}>Sign in</MButton>
                </Flex>
                <Flex justifyContent="center" fontSize="0.7rem" color={PRIMARY_COLOR}>
                    <MLink to="/sign-up">Create an account</MLink>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default SignInPage;
