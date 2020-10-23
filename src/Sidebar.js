import React, {useEffect, useState} from 'react';
import './Sidebar.css';
import {Add, Call, ExpandMore, Headset, InfoOutlined, Mic, Settings, SignalCellularAlt} from "@material-ui/icons";
import SidebarChannel from "./SidebarChannel";
import {Avatar} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import db, {auth} from "./firebase";


function Sidebar() {

  const [channels, setChannels] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection('channels').onSnapshot(snapshot => {
      setChannels(snapshot.docs.map(value => {
        return ({
          id: value.id,
          channel: value.data(),
        })
      }))
    });
  }, [])

  const handleAddChannel = () => {
    const channelName = prompt('enter a new channel name');

    if (channelName) {
      db.collection('channels').add({
        channelName: channelName
      });
    }

  }

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Lacoste Discord clone</h3>
        <ExpandMore/>
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMore/>
            <h4>Text Channels</h4>
          </div>

          <Add onClick={handleAddChannel} className="sidebar__addChannel"/>
        </div>

        <div className="sidebar__channelsList">
          {channels.map(({id, channel}) => {
            return (
              <SidebarChannel key={id} id={id} channelName={channel.channelName}/>
            );
          })}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large"/>
        <div className="sidebar__voiceInfo">
          <h3>Voice connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlined/>
          <Call/>
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar className="sidebar__profileAvatar" onClick={() => auth.signOut()} src={user.photo}/>
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substr(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <Mic/>
          <Headset/>
          <Settings/>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;
