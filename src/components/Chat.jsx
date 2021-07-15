import React, { useState, useEffect } from 'react';
import './css/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import db from '../firebase';
import firebase from 'firebase';
import { Scrollbars } from 'react-custom-scrollbars';

const Chat = () => {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const { roomId } = useParams();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))


            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    };

    return (
        <>
            <div className="chat">
                <div className="chat__header">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                        <p>Last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString()}</p>
                    </div>
                    <div className="chat__headerRight">
                        <IconButton>
                            <SearchOutlined style={{ "color": "#7C8082" }} />
                        </IconButton>
                        <IconButton>
                            <AttachFile style={{ "color": "#7C8082" }} />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon style={{ "color": "#7C8082" }} />
                        </IconButton>
                    </div>
                </div>
                <Scrollbars>
                    <div className="chat__body">
                        {
                            messages.map((message) => {
                                return (
                                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                                        <span className="chat__name">{message.name}</span>
                                        {message.message}
                                        <span className="chat__time">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                                    </p>
                                )
                            })
                        }
                    </div>
                </Scrollbars>
                <div className="chat__footer">
                    <IconButton>
                        <InsertEmoticonIcon style={{ "color": "#7C8082" }} />
                    </IconButton>
                    <form >
                        <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                        <IconButton>
                            <SendIcon onClick={sendMessage} type="submit" style={{ "color": "#7C8082" }} />
                        </IconButton>
                    </form>
                    <IconButton>
                        <MicIcon style={{ "color": "#7C8082" }} />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default Chat
