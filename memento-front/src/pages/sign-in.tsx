import React, {useState} from "react";
import {Flex} from "rebass";
import MTitle from "../components/MTitle";
import MInputText from "../components/MInputText";
import MLabel from "../components/MLabel";
import MButton from "../components/MButton";
import {useFetch} from "../hooks/useFetch";
import {UserController} from "../controllers/UserController";
import {User} from "../types/User";
import MDescription from "../components/MDescription";
import {GREEN_COLOR, RED_COLOR} from "../constants/style";
import {Token} from "../types/Token";

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, isLoading, datas, errors, succeed] = useFetch<Token, "email">(UserController.signIn);

    return (
        <Flex minHeight="100vh" alignItems="center" justifyContent="center">
            <Flex flexDirection="column">
                <Flex mb={4}>
                    <MTitle>Sign in</MTitle>
                </Flex>
                <Flex flexDirection="column">
                    <Flex mb={4} flexDirection="column">
                        <MLabel htmlFor="email">Email</MLabel>
                        <MInputText id="email" placeholder="Email" value={email}
                                    onChange={({target}) => setEmail(target.value)} success={!!datas}
                                    error={!!errors?.pick("email")}/>
                    </Flex>
                    <Flex flexDirection="column">
                        <MLabel htmlFor="password">Password</MLabel>
                        <MInputText id="password" placeholder="Password" value={password}
                                    onChange={({target}) => setPassword(target.value)} success={!!datas}
                                    error={!!errors?.pick("email")}/>
                    </Flex>
                    <Flex mt={3} justifyContent="center" textAlign="center">
                        {succeed ?
                            <MDescription color={GREEN_COLOR}>Successfully logged in (token = {datas.token})</MDescription>
                            :
                            <MDescription color={RED_COLOR}>{errors?.pick("email")}</MDescription>
                        }
                    </Flex>
                </Flex>
                <Flex mt={5} justifyContent="center">
                    <MButton onClick={() => signIn(email, password)}>Sign in</MButton>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default SignInPage;
