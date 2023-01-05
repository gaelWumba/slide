import React, { useState } from 'react'
import styled from 'styled-components'
import '../App.css'
import MyCommandes from '../components/MyCommandes'

import Picker from 'emoji-picker-react';
import {BsXCircle } from 'react-icons/bs';
import {BsEmojiSmileFill} from 'react-icons/bs';
import {BsGearWideConnected} from 'react-icons/bs';


const rooms = ['general'];
const user = []

function Chat(props) {
    const [ShowImojiPicker, setShowImojiPicker] = useState();
    const [roomName, setRoomName] = useState('');

    const time = 'Le ' + new Date().toLocaleDateString();


    const handleNickname = () => {
        const myInputVal = document.getElementById('inputMessage').value = '/nick ';
        

      }
    
      const handleChannel = () => {
        const myInputVal = document.getElementById('inputMessage').value = '/list ';
      }
    
      const handleCreate = () => {
        const myInputVal = document.getElementById('inputMessage').value = '/Create';
        if(myInputVal === '/Create'){
            const subr = myInputVal.replace('/Create', '');
            if(myInputVal === ''){
                rooms.push(myInputVal);
            }
            
            // props.socketRef.current.broadcast.emit('send message', 'payload');
            // props.socketRef.current.emit('join room', subr);
            // myInputVal.onChange = function(event) {setRoomName(event.target.value)};
        }
      }

      const join_room = (e) => {
        e.preventDefault();
        if(roomName === ""){
            alert('Please enter a room name')
        } 
        props.socketRef.current.emit('join room',roomName);
        rooms.push(roomName);

        

        const globalMSG = document.getElementById('roomNameContainer');
        const nameOfRoom = document.createElement('h6');
        nameOfRoom.innerHTML = `The room ${roomName} was creates`;
        nameOfRoom.style.padding = '10px';

        globalMSG.append(nameOfRoom);
      }

      const deleteRoom = () => {
        const currentRoom = document.getElementById('currentRoom').innerText;
        if(roomName === currentRoom) {
            props.socketRef.current.in(roomName).socketsLeave(roomName);
        }
      }

    
      const handleDelete = () => {
        const myInputVal = document.getElementById('inputMessage').value = '/delete ';
      }
    
      const handleJoin = () => {
        const myInputVal = document.getElementById('inputMessage').value = '/join ';
      }
    
      const handleLeave = () => {
        const myInputVal = document.getElementById('inputMessage').value = '/leave ';
      }
    
      const handleUsers = () => {
        const myInputVal = document.getElementById('inputMessage').value = '/users ';
      }
    
      const handleMsg = () => {
        const myInputVal = document.getElementById('inputMessage').value = '/msg ';
      }
    
      const handleMessage = () => {
        const myInputVal = document.getElementById('inputMessage').value = '/message';
        const myMessage = '/message'; 
        if(myInputVal.includes(myMessage)){
            props.socketRef.current.broadcast.emit('send message', 'payload');
        }

      }

    function renderRooms(room) {
        const currentChat = {
            chatName: room,
            isChannel: true,
            receiverId: '',
        }
        return (
            <Row onClick={() => props.toggleChat(currentChat)} key={room}>
                {room}
            </Row>
        )
    }

    function renderUser(user) {
        if(user.id === props.yourId){
            return (
                <Row key={user.id}>
                    @: {user.username}
                </Row>
            )
        }
        const currentChat = {
            chatName: user.username,
            isChannel: false,
            receiverId: user.id,
        }
        return (
            <Row onClick={() => {props.toggleChat(currentChat)}} key={user.id}>
                {user.username}
            </Row>
        )
    }

    let body;
    if(!props.currentChat.isChannel || props.connectedRooms.includes(props.currentChat.chatName)){
        body = (
            
            <Messages className='rounded'>
                <div style={{margin: '10px'}} id='roomNameContainer'></div>

                {props.messages.map((message, index) => {
                    return (
                        <ReceiverMessages  key={index} id={props.username === message.sender ? 'you' : 'receiver'}>
                            <h6>{message.sender}</h6>
                            <h6>{message.content}</h6>
                            <div style={{fontSize: '11px'}}>{time}</div>
                        </ReceiverMessages>
                    )
                })}
            </Messages>
        )
    }else{
        body = (
            <button className='btn btn-success btn-sm' onClick={() => props.joinRoom(props.currentChat.chatName)}>
                Join {props.activeChannel}
            </button>
        )
    }

    function handleKeyDown(e) {
        if(e.key === 'Enter') {
            props.sendMessage();
        }
    }


    const toggleEmoji = () => {
        setShowImojiPicker(!ShowImojiPicker);
    }
    return (
        <Container>
            <SideBar>
                <div className='d-flex'>
                    <form onSubmit={(e) => join_room(e)} className='d-flex flex-col justify-content-center'>
                        <input className="rounded me-sm-2" style={{textAlign: 'center'}}
                            type="text" 
                            id="inputRoom" 
                            placeholder="Room name" 
                            onKeyDown={handleKeyDown}

                            onChange={(event) => {setRoomName(event.target.value)}}
                        />
                        <div style={{marginBottom: '15px'}}>
                            <button className="btn btn-sm" type="submit" style={{width: '20%'}}>+</button>
                        </div>
                    </form>
                </div>
                <h4>Rooms</h4>
                <MainChilds>
                    <h6>{rooms.map(renderRooms)}</h6>
                </MainChilds>

                <h4 style={{marginTop: '15%'}}>Users</h4>
                <MainChilds>
                    <h6>{props.allUsers.map(renderUser)}</h6>
                </MainChilds>
            </SideBar>
            <ChatPanel>
                <ChannelInfo>
                    <h3 id='currentRoom'>{props.currentChat.chatName}</h3>
                    <OptionsCommands>
                        <div className="dropdown">
                            <button type="button" className="btn btn-danger btn-sm" style={{ marginTop: '8px', fontSize: '20px', height: '4vh'}} onClick={() => deleteRoom()}><BsXCircle /></button>
                            <button type="button" className="btn btn-sm" data-bs-toggle="dropdown" style={{ marginTop: '8px', fontSize: '20px', height: '4vh'}}><BsGearWideConnected /></button>              
                            <ul className="dropdown-menu p-2" style={{backgroundColor: '#243A73', color: 'white'}}>
                                <li><p onClick={handleNickname}><strong style={{cursor: 'pointer'}}>/nick</strong> : <i>Définir un surnom</i> </p></li>
                                <li><p onClick={handleChannel}><strong style={{cursor: 'pointer'}}>/list</strong> : <i>Channels disponibles</i></p></li>
                                <li><p onClick={handleCreate}><strong style={{cursor: 'pointer'}}>/create</strong> : <i>Créer un channel</i></p></li>
                                <li><p onClick={handleDelete}><strong style={{cursor: 'pointer'}}>/delete</strong> : <i>Supprimer un channel</i></p></li>
                                <li><p onClick={handleJoin}><strong style={{cursor: 'pointer'}}>/join</strong> : <i>Rejoindre un channel</i></p></li>
                                <li><p onClick={handleLeave}><strong style={{cursor: 'pointer'}}>/leave</strong> : <i>Quitter le channel</i></p></li>
                                <li><p onClick={handleUsers}><strong style={{cursor: 'pointer'}}>/users</strong> : <i>Utilisateurs connectés</i></p></li>
                                <li><p onClick={handleMsg}><strong style={{cursor: 'pointer'}}>/msg</strong> : <i>Envoier un message à un utilisateur spécifique</i></p></li>
                                <li><p onClick={handleMessage}><strong style={{cursor: 'pointer'}}>/message</strong> : <i>Envoier un message à tous les utilisateurs</i></p></li>
                            </ul>
                        </div>
                    </OptionsCommands>
                </ChannelInfo>
                <BodyContainer>
                    {body}
                </BodyContainer>
                <InputContainer>
                    <Input 
                        type='text'
                        value={props.message}
                        onChange={props.handleMessageChange}
                        onKeyDown={handleKeyDown}
                        // onClick={handleClick}
                        placeholder='Message'
                        id='inputMessage'
                    />
                    <BsEmojiSmileFill onClick={toggleEmoji} style={{ marginTop: '5px', marginLeft: '3px', fontSize: '2rem', color: 'wheat', cursor: 'pointer',}}/>
                    {
                    ShowImojiPicker && <Picker />
                    }
                </InputContainer>
                
            </ChatPanel>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    padding: 3%;
    background-color: #FF6464;
    justify-content : center;
`;

const SideBar = styled.div`
    height: 80%;
    width: 15%;
    maxHeight: 2px
    overflow: auto;
    justify-content : space-around;
    background-color: #FF7D7D;
`;


const NewInput = styled.input`
    height: 3vh;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    padding-left: 10px;
`;

const MainChilds = styled.div`
    margin: 10px;    
    border-radius: 5px;
    text-align: left;
    padding-left: 30%;
    background-color: #FF6464;
`;

const OptionsCommands = styled.div`
    width: 10%;
    display: flex;
    justify-content : space-around;
    padding-Right: 5px;
`;

const ChatPanel = styled.div`
    height: 80%;
    width: 60%;
    display: flex;
    flex-direction: column;
    background-color: #FF7D7D;
`;

const BodyContainer = styled.div`
    width: 100%;
    height: 82%;
    overflow: scroll;
    background-color: white;
`;
const InputContainer = styled.div`
    display: flex;
`
const Input = styled.input`
    height: 100%;
    width: 95%;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    padding-left: 10px;
`;

const ChannelInfo = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Row = styled.div`
    cursor: pointer;
`;

const Messages = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const ReceiverMessages = styled.div`
    padding: 10px;
    margin: 10px;
`;
export default Chat