import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import Picker from 'emoji-picker-react';
import {BsXCircle } from 'react-icons/bs';
import {BsEmojiSmileFill} from 'react-icons/bs';
import MyCommandes from '../components/MyCommandes'
import Users from '../components/Users'

import io from 'socket.io-client'
const socket = io.connect('http://localhost:8000');

function Chat() {
  const [roomName, setRoomName] = useState('');
  const [message, setMessage] = useState('');

  const [ShowImojiPicker, setShowImojiPicker] = useState();

  const toggleEmoji = () => {
    setShowImojiPicker(!ShowImojiPicker);
  }

  const clickedEmoji = (event, emoji) => {
    console.log(emoji);   
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
  }

  const join_room = (e) => {
    e.preventDefault();
    if(roomName === ""){
        alert('Please enter a room name')
    }
        
    socket.emit('join_room',roomName);

    const containerRoom = document.getElementById('roomNameContainer');
    const nameOfRoom = document.createElement('h4');
    nameOfRoom.innerHTML = '#' + roomName;
    nameOfRoom.style.padding = '10px';
    nameOfRoom.style.backgroundColor = '#FF6464';

    containerRoom.append(nameOfRoom);
  }

  const send_msg = (e) => {
    console.log(message);
    e.preventDefault();
    if(message === ""){
      return;
    }
    socket.emit("send_msg", {message: message, room: roomName});
    document.getElementById('inputMessage').value = '';
  }

  const disconect = (e) =>{
    io.in(socket.id).socketsLeave({room: roomName})
  }

  useEffect(() => {
    return () => {
      socket.on('receive_msg', (data) => {
        console.log(data);
        if(data.userId === socket.id){
          const containerMsg = document.getElementById('containerMsg');
          const span = document.createElement('span');
          span.innerHTML  = data.message;
          span.style.marginLeft = 'auto';
          span.style.width = 'fit-content';
          span.className = 'rounded';
          span.style.backgroundColor = '#D8D9CF';
          span.style.color = '#243A73';
          span.style.maxWidth = '40%';
          span.style.padding = '10px';
          span.style.wordBreak = 'break-all';

          const time = document.createElement('span');
          const today = new Date();
          const curTime = today.getHours() + ':' + today.getMinutes();
          time.innerHTML = 'Message envoyer à ' + curTime;
          time.style.marginLeft = 'auto';
          time.style.fontStyle = 'italic';
          time.style.marginRight = '10px';
          time.style.marginTop = '10px';
          time.style.fontSize = '12px';
          time.style.color = '#DFD3C3';

          
          containerMsg.appendChild(time);
          containerMsg.appendChild(span);

        }else{
          console.log(data);
          const containerMsg = document.getElementById('containerMsg');
          const span = document.createElement('span');
          span.innerHTML  = data.message;
          span.style.width = 'fit-content';
          span.className = 'rounded';
          span.style.backgroundColor = '#D8D9CF';
          span.style.color = '#243A73';
          span.style.maxWidth = '40%';
          span.style.padding = '10px';
          span.style.wordBreak = 'break-all';

          const name = document.createElement('h4');
          name.innerHTML = data.user;
          name.style.fontWeight = 'bold';
          name.style.marginRight = '10px';
          name.style.marginTop = '10px';
          name.style.fontSize = '12px';

          const time = document.createElement('span');
          const today = new Date();
          const curTime = today.getHours() + ':' + today.getMinutes();
          time.innerHTML = 'Message envoyer à ' + curTime;
          time.style.fontStyle = 'italic';
          time.style.marginTop = '10px';
          time.style.fontSize = '12px';
          time.style.color = '#DFD3C3';

          containerMsg.appendChild(time);
          containerMsg.appendChild(name);
          containerMsg.appendChild(span);
        }
        
      })
    }
  }, [socket])

  return (
    <main className="d-flex justify-content-center" style={{ backgroundColor: '#FF6464', height: "100vh", width: "100vw" }}>
      <article className='mt-5'>
        <div className="d-flex rounded-top" style={{ backgroundColor: "#FF7D7D"}}>
          <div className='d-flex' style={{marginLeft: '4%', marginBottom: '10px', marginTop: '15px'}}>
            <form className='d-flex' onSubmit={(e) => join_room(e)}>
                <input className='rounded' type="text"  id="exampleCheck1" placeholder='Room name' onChange={(event) => {
                  setRoomName(event.target.value)}} style={{textAlign: 'center', height: '40px'}}/>
                <button type="submit" className="btn btn-secondary btn-sm"  style={{ padding: '10px', height:'40px'}}>+</button>
            </form>
          </div>

          <h1 className="p-2 w-100" style={{marginLeft: "5%"}}>SLIDE</h1>
          <button type="button" className="btn btn-danger btn-sm" style={{ marginTop: '8px', fontSize: '20px', height: '4vh'}}><BsXCircle /></button>

          <MyCommandes />      
        </div>
        <section className='d-flex'>
          <div className='d-flex justify-content-center' style={{ backgroundColor: "#FF7D7D", height: "70vh", width: "20vw" }}>
            <div className='flex-col w-100'>
              <div style={{margin: '10px'}} id='roomNameContainer'></div>
              <Users />
            </div>
          </div>
          <div className='d-flex flex-col ' style={{backgroundColor: "white", height: '70vh', width: '40vw'}}>
            <div id='containerMsg' className='d-flex flex-col' style={{overflow: 'auto', height: '80vh', margin: '10px'}}></div>
            <div className='d-flex flex-row' style={{ backgroundColor: "#FF7D7D", width: "100%"}}>
                <form action="" id='form' className='d-flex' style={{margin: '5px', width: '40vw'}} onSubmit={(e) => send_msg(e)} >
                    <input className="form-control me-sm-2" style={{height: '30px', width: '60vw'}} type="text" name="message" id="inputMessage" placeholder="Message" onChange={(event) => {
                        setMessage(event.target.value);
                    }}/>
                    <BsEmojiSmileFill onClick={toggleEmoji} style={{fontSize: '2rem', color: 'white', cursor: 'pointer',}}/>
                    {
                        ShowImojiPicker && <Picker onEmojiClick={clickedEmoji} />
                    }
                    <button className="btn btn-secondary my-2 my-sm-0"  style={{ margin: '6px', padding: '3px', fontSize: '1rem'}} id='sendMessage' type="submit">SEND</button>
                </form>
            </div>
         </div>
        </section>
      </article>
    </main>
  )
}

export default Chat