import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from "@material-ui/icons/Chat";
import { Search } from "@material-ui/icons";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('Please enter an email address for the user you want to chat with.');

        if(!input) return null;

        if(EmailValidator.validate(input) && !chatExists(input) && input !== user.email) {
            //add chat to db if it doesn't exist and is valid
            db.collection('chats').add({
                users: [user.email, input]
            })
        }
    }

    const chatExists = (receipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) => 
            chat.data().users.find((user) => user === receipientEmail)?.length > 0
        )


    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => auth.signOut()}></UserAvatar>

                <IconsContainer>
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </IconsContainer>
            </Header>

            <SearchContainer>
                <Search></Search>
                <SearchInput placeholder="Search in chats"></SearchInput>
            </SearchContainer>

            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

            {/* chat list */}
            {chatsSnapshot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users}></Chat>
            ))}
        </Container>
    )
}

export default Sidebar

const Container = styled.div`

`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;
const IconsContainer = styled.div``;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 2px;
`;
const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;
const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }

`;

