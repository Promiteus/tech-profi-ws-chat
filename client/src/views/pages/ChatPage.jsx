import UserView from "../UserView";
import ChatMessageView from "../ChatMessageView";
import SendView from "../SendView";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {useNavigate} from "@tanstack/react-location";

let socket = null;

const ChatPage = () => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user_ws') ?? null);
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
            socket.emit('chat', {
                roomName,
                join: true,
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
            socket.close();
        }
    }

    const onSend = (val) => {
        socket.emit('chat', {
            user: {
                user: user.userId,
                userName: user?.userName,
            },
            timeSent: new Date().toLocaleString(),
            roomName: roomName,
            message: val,
            join: false,
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