import React, {KeyboardEvent, useState} from "react";
import {Flex} from "rebass";
import MTitle from "../components/MTitle";
import MInputText from "../components/MInputText";
import MLabel from "../components/MLabel";
import MButton from "../components/MButton";
import {useFetch} from "../hooks/useFetch";
import {APIUser} from "../api/APIUser";
import MDescription from "../components/MDescription";
import {PRIMARY_COLOR, RED_COLOR} from "../constants/style";
import {Token} from "../types/Token";
import {useNavigate} from "react-router-dom";
import {useLoggedGuard} from "../hooks/useLoggedGuard";
import {MLink} from "../components/MLink";

function SignUpPage() {
    useLoggedGuard(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();

    const signedUp = () => {
        navigate("/sign-in?message=Successfully registered");
    };
    const [signUp, isLoading, datas, errors, succeed] = useFetch<Token, "email" | "password">(APIUser.signUp, signedUp);

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            signUp(email, password, passwordConfirmation);
        }
    };

    return (
        <Flex flex={1} minHeight="100vh" justifyContent="center" alignItems="center">
            <Flex width={[0.9, 1 / 2, 1 / 3]} py={5} flexDirection="column">
                <Flex width={1} mb={4}>
                    <MTitle>Sign up</MTitle>
                </Flex>
                <Flex width={1} flexDirection="column">
                    <Flex mb={4} flexDirection="column">
                        <MLabel htmlFor="email">Email</MLabel>
                        <MInputText type="email" id="email" placeholder="Email" value={email}
                                    onChange={({target}) => setEmail(target.value)} success={!!datas}
                                    error={!!errors?.pick("email")} onKeyDown={handleEnter}/>
                        {errors?.pick("email") &&
                            <MDescription color={RED_COLOR}>{errors?.pick("email")}</MDescription>
                        }
                    </Flex>
                    <Flex mb={4} flexDirection="column">
                        <MLabel htmlFor="password">Password</MLabel>
                        <MInputText type="password" id="password" placeholder="Password" value={password}
                                    onChange={({target}) => setPassword(target.value)} success={!!datas}
                                    error={!!errors?.pick("password")} onKeyDown={handleEnter}/>
                        {errors?.pick("password") &&
                            <MDescription color={RED_COLOR}>{errors?.pick("password")?.join(" ")}</MDescription>
                        }
                    </Flex>
                    <Flex flexDirection="column">
                        <MLabel htmlFor="password">Confirm your password</MLabel>
                        <MInputText type="password" id="password" placeholder="Password confirmation" value={passwordConfirmation}
                                    onChange={({target}) => setPasswordConfirmation(target.value)} success={!!datas}
                                    error={!!errors?.pick("password")} onKeyDown={handleEnter}/>
                    </Flex>
                </Flex>
                <Flex mb={2} mt={5} justifyContent="center">
                    <MButton onClick={() => signUp(email, password, passwordConfirmation)} disabled={isLoading}>Sign
                        up</MButton>
                </Flex>
                <Flex justifyContent="center" fontSize="0.7rem" color={PRIMARY_COLOR}>
                    <MLink to="/sign-in">I already have an account</MLink>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default SignUpPage;
