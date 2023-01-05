import React, { useState, useEffect} from 'react';
import Picker from 'emoji-picker-react';
import {BsEmojiSmileFill} from 'react-icons/bs';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8000');

function MyChat() {
  const [ShowImojiPicker, setShowImojiPicker] = useState();

  const toggleEmoji = () => {
    setShowImojiPicker(!ShowImojiPicker);
  }
  const [message, setMessage] = useState('');

  const clickedEmoji = (event, emoji) => {
    console.log(emoji);   
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
  }

  socket.on('connection');
  const send_msg = (e) => {
    e.preventDefault();
    if(message === ""){
      return;
    }
    socket.emit("send_msg", {message});
    document.getElementById('inputMessage').value = '';

  }

  useEffect(() => {
    return () => {
      socket.on('receive_msg', (data) => {
        if(data.userId === socket.id){
          console.log(data.userId);

          const containerMsg = document.getElementById('containerMsg');
          let span = document.createElement('span');
          span.innerHTML  = data.message;
          span.style.marginLeft = 'auto';
          span.style.width = 'fit-content';
          span.className = 'rounded';
          span.style.backgroundColor = '#D8D9CF';
          span.style.color = '#243A73';
          span.style.maxWidth = '40%';
          span.style.padding = '10px';
          span.style.marginTop = '10px';
          span.style.wordBreak = 'break-all';

          let time = document.createElement('span');
          time.innerHTML = 'Envoyer il y a quelques instant';
          time.style.marginLeft = 'auto';
          time.style.fontStyle = 'italic';
          time.style.marginRight = '10px';
          time.style.marginTop = '10px';
          time.style.fontSize = '12px';
          time.style.color = '#DFD3C3';
          
          containerMsg.appendChild(time);
          containerMsg.appendChild(span);
          
        }else{
          const containerMsg = document.getElementById('containerMsg');
          let span = document.createElement('span');
          span.innerHTML  = data.message;
          span.style.width = 'fit-content';
          span.className = 'rounded';
          span.style.backgroundColor = '#D8D9CF';
          span.style.color = '#243A73';
          span.style.maxWidth = '40%';
          span.style.padding = '10px';
          span.style.marginTop = '10px';
          span.style.wordBreak = 'break-all';

          let time = document.createElement('span');
          time.innerHTML = 'Reçu il y a quelques instant';
          time.style.fontStyle = 'italic';
          time.style.marginTop = '10px';
          time.style.fontSize = '12px';
          time.style.color = '#DFD3C3';

          containerMsg.appendChild(time);
          containerMsg.appendChild(span);
        }
        
      })
    }
  }, [socket])

  
  return (
    <div className='d-flex flex-col ' style={{backgroundColor: "white", height: '80vh', width: '60vw'}}>
        <div id='containerMsg' className='d-flex flex-col' style={{overflow: 'auto', height: '80vh', margin: '10px'}}></div>
        <div className='d-flex flex-row' style={{ backgroundColor: "#FF7D7D", width: "100%"}}>

            <form action="" id='form' className='d-flex' style={{margin: '5px', width: '60vw'}} onSubmit={(e) => send_msg(e)} >
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
  )
}

export default MyChat