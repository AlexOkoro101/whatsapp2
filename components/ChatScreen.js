import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile"
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Message from "./Message";
import { useState } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipient";
import TimeAgo from "timeago-react";

function ChatScreen({chat, messages}) {
    const [user] = useAuthState(auth);
    const [input, setinput] = useState("");
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
        .collection("chats")
        .doc(router.query.id)
        .collection("messages")
        .orderBy("timeStamp", "asc")
    );

    const [receipientSnapshot] = useCollection(
        db.collection('users').where('email', '==', getRecipientEmail(chat.users, user))

    )

    const showMessages = () => {
         if(messagesSnapshot) {
             return messagesSnapshot.docs.map((message) => (
                 <Message 
                    key={message.id} 
                    user={message.data().user} 
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                 ></Message>
             ))
         }
         else {
             return JSON.parse(messages).map((message) => (
                 <Message key={message.id} message={message} user={message.user}></Message>
             ))
         }
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),

        }, 
        {merge: true}
        
        )

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email, 
            photoURL: user.photoURL,
        })

        setinput("");
    }

    const receipientEmail = getRecipientEmail(chat.users, user);
    const receipient = receipientSnapshot?.docs?.[0]?.data();

    return (
        <Container>
            <Header>
                {receipient ? (
                    <Avatar src={receipient?.photoURL}></Avatar>
                ) : (
                    <Avatar>{receipientEmail[0]}</Avatar>
                )}

                <HeaderInfo>
                    <h3>{receipientEmail}</h3>
                    {receipientSnapshot ? (
                        <p>Last active: {''} 
                        {receipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={receipient?.lastSeen?.toDate()}></TimeAgo>
                        ) : "Unavailable"}
                        </p>

                    ) : (
                        <p>Loading Last active...</p>
                    )}
                </HeaderInfo>
                <HeaderIcon>
                    <IconButton>
                        <AttachFileIcon></AttachFileIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </HeaderIcon>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage></EndOfMessage>
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon></InsertEmoticonIcon>
                <Input
                    value={input}
                    onChange={e => setinput(e.target.value)}
                ></Input>
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <MicIcon></MicIcon>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
    
`;
const Header = styled.div`
    position: sticky;
    background-color: #fff;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;
const HeaderInfo = styled.div`
    margin-left: 15px;
    flex: 1;


    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color: gray;
    }
`;
const HeaderIcon = styled.div`

`;
const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;
const EndOfMessage = styled.div`

`;
const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`;

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    padding: 20px;
    background-color: whitesmoke;
    margin-left: 15px;
    margin-right: 15px;
`;