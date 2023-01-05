import React, { useRef, useState } from "react";
import Form from '../components/UsernameForm';
import Chat from '../components/Chat';
import io from "socket.io-client";
import immer from 'immer';
import '../App.css'
import { useEffect } from "react";


const initialMessagesState = {
    general: [],
};

function Slide() {
    const [username, setUsername] = useState('');
    const [connected, setConnected] = useState(false);
    const [currentChat, setCurrentChat] = useState({isChannel: true, chatName: 'general', receiverId: ""});
    const [connectedRooms, setConnctedRooms] = useState(['general']);
    const [allUsers, setAllusers] = useState([]);
    const [messages, setMessages] = useState(initialMessagesState);
    const [message, setMessage] = useState('');
    const socketRef = useRef();

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }

    
    useEffect(() => {
        setMessage('');
    }, [messages]);

    function sendMessage() {
        if(message !== ''){
            const load = {
                content: message,
                to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverId,
                sender: username,
                chatName: currentChat.chatName,
                isChannel: currentChat.isChannel,
                time: new Date().toLocaleDateString(),
            };
            socketRef.current.emit('send message', load);
            const newMessages = immer(messages, draft => {
                draft[currentChat.chatName].push({
                    sender: username,
                    content: message,
                });
            });
            setMessages(newMessages);
        }
    }

    function roomJoinCallback( inComingMessages, room){
        const newMessages = immer(messages, draft => {
            draft[room] = inComingMessages;
        })
        setMessages(newMessages);
    }

    function joinRoom(room) {
        const newConnectedRooms = immer(connectedRooms, draft => {
            draft.push(room);
        });
        socketRef.current.emit('join room', room, (messages) => roomJoinCallback(messages, room));
        setConnctedRooms(newConnectedRooms);
    }

    
    function toggleChat(currentChat){
        if(!messages[currentChat.chatName]){
            const newMessages = immer(messages, draft => {
                draft[currentChat.chatName] = [];
            });
            setMessages(newMessages);
        }
        setCurrentChat(currentChat);
    }

    function handleChange(e) {
        setUsername(e.target.value);
    }

    function connect() {
        setConnected(true);
        socketRef.current = io.connect('/');
        socketRef.current.emit('join server', username);
        socketRef.current.emit('join room', 'general', (messages) => roomJoinCallback(messages, 'general'));
        socketRef.current.on('new user', allUsers => {
            setAllusers(allUsers);
        });
        socketRef.current.on('new message', ({content, sender, chatName}) => {
            setMessages(messages => {
                const newMessages = immer(messages, draft => {
                    if(draft[chatName]){
                        draft[chatName].push({content, sender});
                    }else{
                        draft[chatName] = [{content, sender}];
                    }
                });
                return newMessages;
            });
        });
    }

    let body;
    if(connected){
        body = (
            <Chat 
                message = {message}
                handleMessageChange = {handleMessageChange}
                sendMessage = {sendMessage}
                yourId = {socketRef.current ? socketRef.current.id: ""}
                allUsers = {allUsers}
                joinRoom = {joinRoom}
                connectedRooms = {connectedRooms}
                currentChat = {currentChat}
                toggleChat = {toggleChat}
                messages = {messages[currentChat.chatName]}
                socketRef = {socketRef}
                username={username}
            />
        )
    }else{
        body = (
            <Form 
                username={username}
                onChange = {handleChange}
                connect = {connect}
            />
        )
    }
    return (
        <div className="App">
            {body}
        </div>
    );
}

export default Slide;
