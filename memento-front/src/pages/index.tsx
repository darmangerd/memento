import React, {useMemo} from "react";
import MTitle from "../components/MTitle";
import MWordList from "../components/MWordList";
import {APIList} from "../api/APIList";
import {useAutomaticFetch} from "../hooks/useAutomaticFetch";
import {useLoggedGuard} from "../hooks/useLoggedGuard";
import {List} from "../types/List";
import {Box, Flex} from "rebass";
import MLoader from "../components/MLoader";
import MDescription from "../components/MDescription";
import {useUser} from "../hooks/useUser";
import MHeader from "../components/MHeader";
import MLinkButton from "../components/MLinkButton";
import {RED_COLOR} from "../constants/style";
import MButton from "../components/MButton";

function IndexPage() {
    useLoggedGuard();

    const {user, userProfile, isLoadingUser, signOut} = useUser();
    const [isLoadingLists, lists] = useAutomaticFetch(APIList.getAllLists);

    const listComponent = (title: string, isLoading: boolean, lists: List[], hideCreators = false) => {
        if (!lists || isLoading) {
            return <Box mb={5}>
                <MTitle>{title}</MTitle>
                <MLoader/>
            </Box>;
        }

        if (lists.length > 0) {
            return <Box mb={5}>
                <MTitle>{title}</MTitle>
                <MWordList hideCreators={hideCreators} lists={lists}/>
            </Box>;
        } else {
            return <Box mb={5}>
                <MTitle>{title}</MTitle>
                <MDescription>Nothing to show...</MDescription>
            </Box>;
        }
    };

    const allLists = useMemo(() => {
        if (!lists || !userProfile) return [];

        return lists.reduce<List[]>((prev, item) => {
            const exists = userProfile.lists.find((item2) => item.id === item2.id);

            if (exists) {
                return prev;
            }

            return [
                ...prev,
                item
            ];
        }, []);
    }, [userProfile, lists]);

    return <>
        <MHeader minHeight={100}>
            <Flex flex={1} px={4} justifyContent="space-between" alignItems="center">
                <Flex color="rgba(0, 0, 0, 0.6)" fontSize="1rem">
                    {user.email}
                </Flex>
                <Flex>
                    <Flex mr={3}>
                        <MButton background={RED_COLOR} onClick={signOut}>Sign out</MButton>
                    </Flex>
                    <Flex>
                        <MLinkButton href="/list/create">Create a list</MLinkButton>
                    </Flex>
                </Flex>
            </Flex>
        </MHeader>
        <Flex px={4} py={3} flexDirection="column">
            {listComponent("Your lists", isLoadingUser, userProfile?.lists, true)}
            {listComponent("All the lists", isLoadingLists, allLists)}
        </Flex>
    </>;
}

export default IndexPage;
