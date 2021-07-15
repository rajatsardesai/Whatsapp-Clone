import React, { useState, useEffect } from 'react';
import db from '../firebase';
import './css/Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import { useStateValue } from '../StateProvider';
import { Scrollbars } from 'react-custom-scrollbars';

const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        try {
            const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
                setRooms(snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                ))
                ));

            return () => {
                unsubscribe();
            }
        }
        catch {
            <p>404 Error</p>
        }
    }, [])

    return (
        <>
            <div className="sidebar">
                <div className="sidebar__header">
                    <Avatar src={user?.photoURL} />
                    <div className="sidebar__headerRight">
                        <IconButton>
                            <DonutLargeIcon style={{ "color": "#7C8082" }} />
                        </IconButton>
                        <IconButton>
                            <ChatIcon style={{ "color": "#7C8082" }} />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon style={{ "color": "#7C8082" }} />
                        </IconButton>
                    </div>
                </div>

                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined />
                        <input type="text" placeholder="Search or start new chat" />
                    </div>
                </div>

                <div className="sidebar__chats">
                    <SidebarChat addNewChat />
                    <Scrollbars style={{ height: 300 }}>
                        {
                            rooms.map(room => (
                                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                            ))
                        }
                    </Scrollbars>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
