import React, {useEffect, useState} from 'react';
import './Chat.css';
import ChatHeader from "./ChatHeader";
import {AddCircle, CardGiftcard, EmojiEmotions, Gif} from "@material-ui/icons";
import Message from "./Message";
import {useSelector} from "react-redux";
import {selectChannelId, selectChannelName} from "./features/appSlice";
import {selectUser} from "./features/userSlice";
import db from "./firebase";
import firebase from "firebase";

const Chat = () => {

  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection('channels').doc(channelId).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(item => item.data()));
      });
    }
  }, [channelId]);

  const sendMessage = e => {
    e.preventDefault();

    db.collection('channels').doc(channelId).collection('messages').add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  }

  return (
    <div className="chat">
      <ChatHeader channelName={channelName}/>

      <div className="chat__messages">
        {
          messages.map((item, index) => (
            <div key={index}>
              <Message user={item.user} message={item.message} timestamp={item.timestamp}/>
            </div>
          ))
        }
      </div>

      <div className="chat__input">
        <AddCircle fontSize="large"/>
        <form>
          <input value={input}
                 disabled={!channelId}
                 onChange={(e) => setInput(e.target.value)}
                 type="text"
                 placeholder={`Message on #${channelName}`}/>
          <button onClick={sendMessage} className="chat__inputButton" disabled={!channelId} type="submit">Send
            Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcard fontSize="large"/>
          <Gif fontSize="large"/>
          <EmojiEmotions fontSize="large"/>
        </div>
      </div>

    </div>
  );
}

export default Chat;
