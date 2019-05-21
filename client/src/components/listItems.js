import React from 'react';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import ListSubheader from '@material-ui/core/ListSubheader/index';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import PeopleIcon from '@material-ui/icons/People';
import Chat from '@material-ui/icons/Chat';
import Mood from '@material-ui/icons/Mood';
import Settings from '@material-ui/icons/Settings';
import {Link} from 'react-router-dom'

const linkStyle = {
  textDecoration: 'none'
};

export const mainListItems = (
  <div>
    <Link to="/" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="Dashboard"/>
      </ListItem>
    </Link>
    <Link to="/users" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon/>
        </ListItemIcon>
        <ListItemText primary="Users"/>
      </ListItem>
    </Link>
    <Link to="/channels" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <AlternateEmail/>
        </ListItemIcon>
        <ListItemText primary="Channels"/>
      </ListItem>
    </Link>
    <Link to="/messages" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <Chat/>
        </ListItemIcon>
        <ListItemText primary="Messages"/>
      </ListItem>
    </Link>
    <Link to="/emojis" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <Mood/>
        </ListItemIcon>
        <ListItemText primary="Emojis"/>
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <Link to="/setting" style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <Settings/>
        </ListItemIcon>
        <ListItemText primary="Settings"/>
      </ListItem>
    </Link>
  </div>
);
