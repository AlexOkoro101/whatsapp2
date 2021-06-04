import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chat from "@material-ui/icons/Chat";
import { Search } from "@material-ui/icons";
import * as EmailValidator from "email-validator";
import { auth } from "../firebase";

function Sidebar() {
    const createChat = () => {
        const input = prompt('Please enter an email address for the user you want to chat with.');

        if(!input) return null;

        if(EmailValidator.validate(input)) {
            //add chat to db
        }
    }

    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => auth.signOut()}></UserAvatar>

                <IconsContainer>
                    <IconButton>
                        <Chat></Chat>
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

