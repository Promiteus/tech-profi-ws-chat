import UserView from "../UserView";
import ChatMessageView from "../ChatMessageView";
import SendView from "../SendView";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {useNavigate} from "@tanstack/react-location";
import {users} from "./LoginPage";

let socket = null;

const ChatPage = () => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user_ws') ?? null);
    const userIndex = +(sessionStorage.getItem('user_index') ?? 0);
    const roomName = sessionStorage.getItem('room_ws');
    const navigate = useNavigate();

    useEffect(() => {
        socket = io("http://localhost:4000", {
            path: '/socket.io',
            transports: ['websocket'],
            autoConnect: true
        });

        if (!user) {
            navigate({to: '/'})
        }

        socket.on('connect', () => {
            socket.emit('join', {
                roomName,
                user: { socketId: socket.id, ...user },
            })
            setConnected(true);
        });

        socket.on('disconnect', () => {
            setConnected(false);
        });

        socket.on('chat', (e) => {
            setMessages((messages) => [...messages, e])
        });
        return () => {
            closeSocket(socket);
        }
    }, []);

    const closeSocket = (socket) => {
        if (socket) {
            socket.off('connect');
            socket.off('disconnect')
            socket.off('chat');
            socket.off('join');
            socket.close();
        }
    }

    const onSend = (val) => {
        let fUser = null;
        if (userIndex === 0) {
            fUser = users[userIndex+1];
        } else {
            fUser = users[userIndex-1];
        }

        socket.emit('chat', {
            user: user,
            fromUser: fUser,
            roomName: roomName,
            message: val,
        })
    }

    const logOut = () => {
        closeSocket(socket);
        navigate({to: '/'})
    }

    return (
        <>
            <UserView isOnline={connected} user={user} logOut={logOut}/>
            <ChatMessageView messages={messages} currentUser={user}/>
            <SendView onSend={onSend}/>
        </>
    );
}

export default ChatPage;